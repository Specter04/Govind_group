import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { useProjects } from '../context/ProjectContext';

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  enquiryType: 'Creations / Real Estate',
  projectSlug: 'General Enquiry',
  message: '',
};

export default function Contact() {
  const { projects } = useProjects();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Convert 'General Enquiry' back to project name if that's preferred, 
          // but the backend handles `projectSlug` nicely and defaults project to 'General Enquiry'.
          project: formData.projectSlug === 'General Enquiry' ? 'General Enquiry' : projects.find(p => p.slug === formData.projectSlug)?.name || formData.projectSlug,
          projectSlug: formData.projectSlug === 'General Enquiry' ? null : formData.projectSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setFormError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData(initialFormState);
    setFormError('');
  };

  return (
    <div className="page active">
      <div className="pt-[200px] px-0 pb-[90px] bg-gradient-to-b from-navy-deep to-navy text-ivory text-left">
        <div className="wrap relative z-10">
          <Reveal>
            <span className="eyebrow block mb-4">Contact</span>
            <h1 className="text-[clamp(42px,6vw,74px)]">Get In Touch</h1>
            <p className="text-ivory-sec max-w-[560px] mt-4.5 text-base leading-[1.7]">
              For enquiries about Creations, Govind Garden, careers or partnerships.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-[90px]">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-10 md:gap-5 justify-between mb-12">
              <div>
                <span className="eyebrow block mb-2">Phone</span>
                <p><a href="tel:+919900581100" className="text-charcoal hover:text-navy text-[17px]">+91 99005 81100</a></p>
              </div>
              <div>
                <span className="eyebrow block mb-2">Email</span>
                <p><a href="mailto:info@thegovindgroup.com" className="text-charcoal hover:text-navy text-[17px]">info@thegovindgroup.com</a></p>
              </div>
              <div>
                <span className="eyebrow block mb-2">Address</span>
                <p className="text-charcoal text-[17px]">Govind Group Office, Level 4, P.K. Chowk,<br/>Pimple Saudagar, Pune – 411027</p>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/e4Rx5xvgrd2vYfFz7?g_st=ic" target="_blank" rel="noopener noreferrer" className="block mb-[90px]">
              <div className="ph-image light h-[340px]"><span className="ph-label">Google Maps Embed<br/>— live map link: tap to open in Google Maps —</span></div>
            </a>
          </Reveal>

          <Reveal>
            <div className="mb-10 text-center max-w-[800px] mx-auto">
              <span className="eyebrow block mb-3">Enquiry Form</span>
              <h2 className="text-[32px]">Send an Enquiry</h2>
            </div>
            
            <div className="max-w-[800px] mx-auto">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Enquiry Type</label>
                    <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy appearance-none">
                      <option value="Creations / Real Estate">Creations / Real Estate</option>
                      <option value="Govind Garden">Govind Garden</option>
                      <option value="Careers">Careers</option>
                      <option value="Foundation / CSR">Foundation / CSR</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Project</label>
                    <select name="projectSlug" value={formData.projectSlug} onChange={handleChange} className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy appearance-none">
                      <option value="General Enquiry">General Enquiry</option>
                      {projects.map(p => (
                        <option key={p.slug} value={p.slug}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy resize-y"></textarea>
                  </div>
                  
                  {formError && (
                    <div className="md:col-span-2 text-red-600 bg-red-50 p-4 border border-red-200 text-center text-[14px]">
                      {formError}
                    </div>
                  )}

                  <div className="md:col-span-2 text-center mt-4">
                    <button type="submit" disabled={isSubmitting} className="btn btn-dark inline-block border-none disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 px-5 bg-white border border-stone max-w-[520px] mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#1b5e20] text-ivory text-[30px] flex items-center justify-center mx-auto mb-5 font-bold">✓</div>
                  <h3 className="text-[26px]">Enquiry Sent Successfully</h3>
                  <p className="text-taupe mt-3">Thank you for getting in touch. Our team will contact you shortly.</p>
                  <button onClick={resetForm} className="mt-6 btn btn-outline inline-block text-[13px]">Send Another Enquiry</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
