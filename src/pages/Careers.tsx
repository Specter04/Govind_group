import { useState } from 'react';
import { Reveal } from '../components/Reveal';

export default function Careers() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById('careers-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page active">
      <div className="pt-[200px] px-0 pb-[90px] bg-gradient-to-b from-navy-deep to-navy text-ivory text-left">
        <div className="wrap relative z-10">
          <Reveal>
            <span className="eyebrow block mb-4">Careers</span>
            <h1 className="text-[clamp(42px,6vw,74px)]">Build With Us</h1>
            <p className="text-ivory-sec max-w-[560px] mt-4.5 text-base leading-[1.7]">
              Join a team shaping Pune's residential, commercial and hospitality landscape.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-[90px] border-b border-stone">
        <div className="wrap">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[50px] lg:gap-10 text-center lg:text-left">
              <div>
                <h3 className="text-[20px]">Legacy Culture</h3>
                <p className="text-taupe text-[14px] mt-2">Family-owned values, since 1998.</p>
              </div>
              <div>
                <h3 className="text-[20px]">Real Craft</h3>
                <p className="text-taupe text-[14px] mt-2">Work across development, hospitality &amp; design.</p>
              </div>
              <div>
                <h3 className="text-[20px]">Growth</h3>
                <p className="text-taupe text-[14px] mt-2">Two divisions, expanding portfolio.</p>
              </div>
              <div>
                <h3 className="text-[20px]">Pune-Rooted</h3>
                <p className="text-taupe text-[14px] mt-2">Based in PCMC, building across the city.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[90px] border-b border-stone">
        <div className="wrap">
          <Reveal>
            <div className="mb-10 text-center lg:text-left">
              <span className="eyebrow block mb-3">Current Openings</span>
              <h2 className="text-[32px]">Open Roles</h2>
            </div>
            <div className="text-[11.5px] text-taupe border border-dashed border-stone px-4 py-2.5 inline-block tracking-[.03em] mb-5 bg-[rgba(217,210,197,.25)]">
              Sample listings — real openings are CMS-managed with an active/inactive toggle
            </div>
            
            <div>
              {[
                { title: "Site Sales Executive", meta: "Sales & Marketing · Pimple Saudagar · Full-time" },
                { title: "Site Engineer", meta: "Construction & Projects · Tathawade · Full-time" },
                { title: "Guest Relations Associate", meta: "Govind Garden · Hospitality · Full-time" }
              ].map((job, i) => (
                <div key={i} className="flex justify-between items-center py-6 border-b border-stone cursor-pointer group transition-all duration-300 hover:pl-2.5 hover:pr-2.5 hover:bg-[rgba(138,131,117,.03)]" onClick={scrollToForm}>
                  <div>
                    <h4 className="text-[18px] mb-1.5 flex items-center">
                      {job.title}
                      <span className="ml-2.5 px-2 py-1 bg-[#fff8e1] text-gold border border-[rgba(184,146,85,.3)] rounded-[2px] text-[9.5px] uppercase tracking-[.08em] font-semibold hidden md:inline-block">Sample</span>
                    </h4>
                    <div className="text-taupe text-[13.5px]">{job.meta}</div>
                  </div>
                  <div className="text-[22px] text-gold-light opacity-60 transition-transform duration-300 group-hover:opacity-100 group-hover:translate-x-1">→</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="careers-form-anchor" className="py-[90px]">
        <div className="wrap max-w-[800px]">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="eyebrow block mb-3">Apply</span>
              <h2 className="text-[32px]">Application Form</h2>
            </div>
            
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Full Name</label>
                  <input type="text" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Email</label>
                  <input type="email" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Phone</label>
                  <input type="tel" required className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Position Applying For</label>
                  <select className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy appearance-none">
                    <option>Site Sales Executive</option>
                    <option>Site Engineer</option>
                    <option>Guest Relations Associate</option>
                    <option>General Application</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Experience</label>
                  <input type="text" placeholder="e.g. 3 years" className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Cover Note</label>
                  <textarea rows={4} className="p-3.5 border border-stone bg-ivory text-charcoal font-sans text-[14.5px] focus:outline-none focus:border-navy resize-y"></textarea>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[11px] tracking-[.1em] uppercase font-bold text-taupe">Resume</label>
                  <div className="p-[30px] border border-dashed border-stone text-center text-taupe bg-[rgba(217,210,197,.2)] text-[14px] cursor-pointer">
                    Click or drag to upload — PDF/DOC
                  </div>
                </div>
                <div className="md:col-span-2 text-center mt-4">
                  <button type="submit" className="btn btn-dark inline-block border-none">Submit Application</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 px-5 bg-white border border-stone max-w-[520px] mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
                <div className="w-[60px] h-[60px] rounded-full bg-[#1b5e20] text-ivory text-[30px] flex items-center justify-center mx-auto mb-5 font-bold">✓</div>
                <h3 className="text-[26px]">Application Received</h3>
                <p className="text-taupe mt-3">This is a prototype confirmation state — no data is actually sent.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
