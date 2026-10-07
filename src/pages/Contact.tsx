import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { Reveal } from '../components/Reveal';
import clsx from 'clsx';

type Intent = 'Buyer' | 'Seller/JV' | null;
type ContactPref = 'WhatsApp' | 'Call' | 'Either' | '';

export default function Contact() {
  const location = useLocation();
  const { projects } = useProjects();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: null as Intent,
    
    // Buyer fields
    projectInterest: location.state?.projectSlug || '',
    propertyRequirement: '',
    budget: '',
    preferredLocation: '',
    purchaseTimeline: '',
    additionalRequirement: '',
    
    // Seller fields
    whatToDiscuss: '',
    propertyLocation: '',
    propertyType: '',
    propertyArea: '',
    ownership: '',
    currentStatus: '',
    opportunityType: '',
    expectedPrice: '',
    additionalInfo: '',
    
    contactPreference: '' as ContactPref,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setField = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIntentSelection = (intent: Intent) => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError('Please enter your full name and phone number to continue.');
      return;
    }
    setFormError('');
    setField('intent', intent as string);
    setStep(2);
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setFormError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.contactPreference) {
      setFormError('Please select a contact preference.');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');

    let structuredMessage = '';
    if (formData.intent === 'Buyer') {
      structuredMessage = `LEAD TYPE: Buyer
PROJECT: ${formData.projectInterest || 'Not sure yet'}
REQUIREMENT: ${formData.propertyRequirement}
BUDGET: ${formData.budget}
LOCATION: ${formData.preferredLocation}
TIMELINE: ${formData.purchaseTimeline}
CONTACT PREF: ${formData.contactPreference}
ADDITIONAL: ${formData.additionalRequirement}`;
    } else {
      structuredMessage = `LEAD TYPE: Seller/JV
DISCUSS: ${formData.whatToDiscuss}
LOCATION: ${formData.propertyLocation}
PROPERTY TYPE: ${formData.propertyType}
AREA: ${formData.propertyArea}
OWNERSHIP: ${formData.ownership}
STATUS: ${formData.currentStatus}
OPPORTUNITY: ${formData.opportunityType}
EXPECTED PRICE: ${formData.expectedPrice}
CONTACT PREF: ${formData.contactPreference}
ADDITIONAL: ${formData.additionalInfo}`;
    }

    const projectName = formData.projectInterest 
      ? projects.find(p => p.slug === formData.projectInterest)?.name || formData.projectInterest 
      : 'General Enquiry';

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: 'not-provided@govindgroup.com',
          enquiryType: formData.intent,
          project: projectName,
          projectSlug: formData.projectInterest || null,
          message: structuredMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit enquiry');
      setStep(4);
    } catch (err: any) {
      console.error('Submission error:', err);
      setFormError(err.message || 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const OptionButton = ({ field, value, label }: { field: string, value: string, label: string }) => (
    <button 
      type="button"
      onClick={() => setField(field, value)}
      className={clsx(
        "py-4 px-6 text-left border transition-all duration-300 w-full text-[15px]",
        formData[field as keyof typeof formData] === value 
          ? "border-[#041C3A] bg-[#041C3A] text-white" 
          : "border-[#D9D2C5] bg-transparent text-[#041C3A] hover:border-[#041C3A]"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="page active bg-[#F5F0E8] min-h-screen text-[#041C3A] font-sans pb-20">
      <div className="pt-[140px] md:pt-[180px] px-6 max-w-[700px] mx-auto">
        <Reveal>
          {step < 4 && (
            <div className="mb-12">
              <span className="eyebrow block mb-4 text-[#D4B27A] tracking-widest text-[12px] font-bold uppercase">Enquire</span>
              {step === 1 && (
                <>
                  <h1 className="text-[40px] md:text-[56px] font-serif leading-[1.1] mb-4">Let's Connect</h1>
                  <p className="text-[17px] text-[#041C3A]/70">Tell us a little about yourself and we'll get in touch.</p>
                </>
              )}
              {step === 2 && formData.intent === 'Buyer' && (
                <>
                  <button onClick={handleBack} className="text-[#D4B27A] text-[13px] uppercase tracking-wider mb-6 block hover:text-[#041C3A]">← Back</button>
                  <h1 className="text-[32px] md:text-[44px] font-serif leading-[1.1] mb-4">Tell us what you're looking for</h1>
                </>
              )}
              {step === 2 && formData.intent === 'Seller/JV' && (
                <>
                  <button onClick={handleBack} className="text-[#D4B27A] text-[13px] uppercase tracking-wider mb-6 block hover:text-[#041C3A]">← Back</button>
                  <h1 className="text-[32px] md:text-[44px] font-serif leading-[1.1] mb-4">Tell us about your property</h1>
                </>
              )}
              {step === 3 && (
                <>
                  <button onClick={handleBack} className="text-[#D4B27A] text-[13px] uppercase tracking-wider mb-6 block hover:text-[#041C3A]">← Back</button>
                  <h1 className="text-[32px] md:text-[44px] font-serif leading-[1.1] mb-4">How would you prefer us to reach you?</h1>
                </>
              )}
            </div>
          )}

          <div className="space-y-10">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
                <div className="space-y-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60">Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter your name" className="p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60">Phone Number *</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 | Enter mobile number" className="p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                  </div>
                  
                  {formError && <div className="text-red-600 text-[14px]">{formError}</div>}
                  
                  <div className="pt-6 border-t border-[#041C3A]/10 mt-10">
                    <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block mb-5">I'm interested as</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={() => handleIntentSelection('Buyer')} className="py-5 px-6 border border-[#041C3A]/20 hover:border-[#041C3A] text-[#041C3A] bg-white/40 hover:bg-white text-[16px] font-medium transition-all">
                        BUYER
                      </button>
                      <button onClick={() => handleIntentSelection('Seller/JV')} className="py-5 px-6 border border-[#041C3A]/20 hover:border-[#041C3A] text-[#041C3A] bg-white/40 hover:bg-white text-[16px] font-medium transition-all">
                        SELLER / JV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 - BUYER */}
            {step === 2 && formData.intent === 'Buyer' && (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] space-y-12">
                
                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">1. Project Interest</label>
                  <select name="projectInterest" value={formData.projectInterest} onChange={handleChange} className="w-full p-4 bg-white border border-[#041C3A]/20 text-[16px] focus:outline-none focus:border-[#041C3A] appearance-none rounded-none">
                    <option value="">I'm not sure yet</option>
                    <option value="All projects">All projects</option>
                    {projects.filter(p => !p.nameOnly).map(p => (
                      <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">2. Property Requirement</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Villa / Bungalow', 'Commercial', 'Other'].map(opt => (
                      <OptionButton key={opt} field="propertyRequirement" value={opt} label={opt} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">3. Approximate Budget</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Under ₹50 Lakh', '₹50 Lakh – ₹1 Cr', '₹1 – ₹2 Cr', '₹2 – ₹5 Cr', '₹5 Cr+', 'Prefer to discuss'].map(opt => (
                      <OptionButton key={opt} field="budget" value={opt} label={opt} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">4. Preferred Location</label>
                  <input name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} type="text" placeholder="Enter city / area" className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">5. Purchase Timeline</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Immediately', 'Within 3 months', '3–6 months', '6–12 months', 'Just exploring'].map(opt => (
                      <OptionButton key={opt} field="purchaseTimeline" value={opt} label={opt} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">6. Additional Requirement</label>
                  <textarea name="additionalRequirement" value={formData.additionalRequirement} onChange={handleChange} rows={3} placeholder="Tell us what you're looking for..." className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30 resize-none"></textarea>
                </div>

                <button onClick={handleNext} className="w-full py-5 bg-[#041C3A] text-white text-[15px] font-medium uppercase tracking-wider hover:bg-[#D4B27A] transition-colors mt-8">
                  Continue
                </button>
              </div>
            )}

            {/* STEP 2 - SELLER/JV */}
            {step === 2 && formData.intent === 'Seller/JV' && (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] space-y-12">
                
                <div className="space-y-4">
                  <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">What would you like to discuss?</label>
                  <div className="flex flex-col gap-3">
                    {['Sell my property', 'Explore a JV', 'Other property opportunity'].map(opt => (
                      <OptionButton key={opt} field="whatToDiscuss" value={opt} label={opt.toUpperCase()} />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#041C3A]/10 mt-10 mb-8">
                  <h3 className="text-[20px] font-serif mb-6">Property Details</h3>
                  
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Where is the property located? *</label>
                      <input name="propertyLocation" value={formData.propertyLocation} onChange={handleChange} type="text" placeholder="Area / locality / city" className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Property Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Land', 'Residential', 'Commercial', 'Redevelopment', 'Industrial', 'Other'].map(opt => (
                          <OptionButton key={opt} field="propertyType" value={opt} label={opt} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Approximate Property Area</label>
                      <input name="propertyArea" value={formData.propertyArea} onChange={handleChange} type="text" placeholder="e.g. 5,000 sq. ft. / 1 acre" className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Ownership</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Individual', 'Family', 'Company / Entity', 'Other'].map(opt => (
                          <OptionButton key={opt} field="ownership" value={opt} label={opt} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Current Property Status</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Vacant land', 'Existing building', 'Under development', 'Occupied', 'Other'].map(opt => (
                          <OptionButton key={opt} field="currentStatus" value={opt} label={opt} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#041C3A]/10 mt-10 mb-8">
                  <h3 className="text-[20px] font-serif mb-6">Opportunity Details</h3>
                  
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Opportunity Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Outright sale', 'Joint Venture', 'Joint Development', 'Redevelopment', 'Other'].map(opt => (
                          <OptionButton key={opt} field="opportunityType" value={opt} label={opt} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Expected Price / Terms (Optional)</label>
                      <input name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} type="text" placeholder="You can also discuss this with us later" className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Tell us a little about the property</label>
                      <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} placeholder="Anything you think we should know..." className="w-full p-4 bg-transparent border-b border-[#041C3A]/20 text-[18px] focus:outline-none focus:border-[#041C3A] transition-colors placeholder-[#041C3A]/30 resize-none"></textarea>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[12px] tracking-[.1em] uppercase font-bold text-[#041C3A]/60 block">Property Documents (Optional)</label>
                      <div className="border border-dashed border-[#041C3A]/30 p-8 text-center bg-white/40 hover:bg-white transition-colors cursor-pointer text-[#041C3A]/70">
                        Click to upload documents or drag and drop
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => {
                  if (!formData.propertyLocation) {
                    setFormError("Please enter the property location.");
                    return;
                  }
                  setFormError("");
                  handleNext();
                }} className="w-full py-5 bg-[#041C3A] text-white text-[15px] font-medium uppercase tracking-wider hover:bg-[#D4B27A] transition-colors mt-8">
                  Continue
                </button>
                {formError && <div className="text-red-600 text-[14px] mt-2">{formError}</div>}
              </div>
            )}

            {/* STEP 3 - CONTACT PREFERENCE */}
            {step === 3 && (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] space-y-12">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setField('contactPreference', 'WhatsApp')}
                    className={clsx("py-6 px-4 border text-center transition-all", formData.contactPreference === 'WhatsApp' ? "border-[#041C3A] bg-[#041C3A] text-white" : "border-[#041C3A]/20 bg-white/40 hover:border-[#041C3A] text-[#041C3A]")}
                  >
                    <div className="font-medium text-[17px] mb-1">WhatsApp</div>
                  </button>
                  <button 
                    onClick={() => setField('contactPreference', 'Call')}
                    className={clsx("py-6 px-4 border text-center transition-all", formData.contactPreference === 'Call' ? "border-[#041C3A] bg-[#041C3A] text-white" : "border-[#041C3A]/20 bg-white/40 hover:border-[#041C3A] text-[#041C3A]")}
                  >
                    <div className="font-medium text-[17px] mb-1">Call</div>
                  </button>
                  <button 
                    onClick={() => setField('contactPreference', 'Either')}
                    className={clsx("py-6 px-4 border text-center transition-all", formData.contactPreference === 'Either' ? "border-[#041C3A] bg-[#041C3A] text-white" : "border-[#041C3A]/20 bg-white/40 hover:border-[#041C3A] text-[#041C3A]")}
                  >
                    <div className="font-medium text-[17px] mb-1">Either is fine</div>
                  </button>
                </div>

                {formError && <div className="text-red-600 text-[14px]">{formError}</div>}

                <div className="pt-8 text-center">
                  <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="w-full md:w-auto md:min-w-[300px] py-5 px-10 bg-[#041C3A] text-white text-[15px] font-medium uppercase tracking-wider hover:bg-[#D4B27A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                  <p className="text-[12px] text-[#041C3A]/50 mt-6 max-w-[400px] mx-auto leading-relaxed">
                    By submitting this enquiry, you agree that Govind Group may contact you regarding your enquiry.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4 - SUCCESS */}
            {step === 4 && (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] text-center pt-10">
                <span className="eyebrow block mb-6 text-[#D4B27A] tracking-widest text-[12px] font-bold uppercase">Thank You</span>
                <h1 className="text-[40px] md:text-[56px] font-serif leading-[1.1] mb-6">We've received your enquiry.</h1>
                <p className="text-[18px] text-[#041C3A]/70 mb-16 max-w-[480px] mx-auto">
                  Our team will get in touch with you shortly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/919900581100" target="_blank" rel="noopener noreferrer" className="py-4 px-8 border border-[#041C3A] text-[#041C3A] hover:bg-[#041C3A] hover:text-white transition-colors font-medium tracking-wide flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.389 0 0 5.39 0 12.031c0 2.126.551 4.195 1.6 6.01L.225 23.36l5.46-1.433a11.966 11.966 0 006.346 1.802h.004c6.64 0 12.03-5.389 12.03-12.031C24.066 5.389 18.675 0 12.031 0zm0 21.728c-1.801 0-3.56-.484-5.105-1.401l-.366-.217-3.792.994.994-3.7-.238-.378a9.98 9.98 0 01-1.528-5.295c0-5.525 4.496-10.023 10.035-10.023 5.538 0 10.033 4.498 10.033 10.023 0 5.526-4.495 10.023-10.033 10.023zm5.502-7.519c-.302-.152-1.789-.884-2.065-.986-.277-.101-.478-.152-.68.152-.201.303-.781.986-.957 1.188-.176.202-.352.227-.654.075-1.761-.885-3.056-1.92-4.14-3.753-.176-.303-.018-.466.133-.618.136-.136.302-.354.453-.531.152-.177.202-.303.303-.505.101-.202.05-.379-.025-.531-.076-.152-.68-1.643-.932-2.25-.245-.591-.496-.511-.68-.521h-.58c-.201 0-.528.076-.805.379-.277.303-1.056 1.036-1.056 2.527 0 1.491 1.082 2.932 1.233 3.134.151.202 2.138 3.262 5.178 4.573 1.954.843 2.7.917 3.655.772.775-.117 2.36-.963 2.693-1.895.332-.932.332-1.73.232-1.895-.101-.165-.378-.266-.68-.418z"/></svg>
                    Chat on WhatsApp
                  </a>
                  <a href="tel:+919900581100" className="py-4 px-8 border border-[#041C3A] text-[#041C3A] hover:bg-[#041C3A] hover:text-white transition-colors font-medium tracking-wide flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call Govind Group
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
