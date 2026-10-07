import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

export default function Hospitality() {
  const navigate = useNavigate();

  return (
    <div className="page active">
      <div className="pt-[200px] px-0 pb-[90px] bg-gradient-to-b from-navy-deep to-navy text-ivory text-left">
        <div className="wrap relative z-10">
          <Reveal>
            <span className="eyebrow block mb-4">Hospitality</span>
            <h1 className="text-[clamp(42px,6vw,74px)]">Hospitality &amp; Community</h1>
            <p className="text-ivory-sec max-w-[560px] mt-4.5 text-base leading-[1.7]">
              Govind Garden and the Shatrughna Kate Youth Foundation — the human side of Govind Group.
            </p>
          </Reveal>
        </div>
      </div>

      <section id="garden" className="py-[118px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="flex items-center justify-center p-10 h-full min-h-[280px] bg-garden-green">
              {/* <img src="[BASE64_IMAGE]" className="max-h-[170px] w-auto max-w-[90%]" alt="Govind Garden" /> */}
              <div className="text-ivory font-serif text-2xl text-center">Govind Garden Logo</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <span className="eyebrow block mb-4">Govind Garden</span>
              <h2 className="text-[34px] mb-5 leading-[1.15]">A Multi-Cuisine Dining Destination</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                Govind Garden offers North Indian, Italian &amp; Continental, Chinese, Maharashtrian and seafood cuisine — for everyday dining, banquets and events.
              </p>
              <div className="flex gap-3.5 flex-wrap mt-[26px]">
                <div className="border border-gold text-gold-light px-4.5 py-2.5 text-[12px] tracking-[.08em] uppercase">North Indian</div>
                <div className="border border-gold text-gold-light px-4.5 py-2.5 text-[12px] tracking-[.08em] uppercase">Italian / Continental</div>
                <div className="border border-gold text-gold-light px-4.5 py-2.5 text-[12px] tracking-[.08em] uppercase">Chinese</div>
                <div className="border border-gold text-gold-light px-4.5 py-2.5 text-[12px] tracking-[.08em] uppercase">Maharashtrian</div>
                <div className="border border-gold text-gold-light px-4.5 py-2.5 text-[12px] tracking-[.08em] uppercase">Seafood</div>
              </div>
              <div className="btn btn-dark mt-[26px]" onClick={() => navigate('/contact')}>Enquire About Dining &amp; Events</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="foundation" className="bg-navy text-ivory py-[118px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="order-2 md:order-1">
              <span className="eyebrow block mb-4">Social Impact</span>
              <h2 className="text-[34px] text-ivory mb-5 leading-[1.15]">Shatrughna Kate Youth Foundation</h2>
              <p className="text-ivory-sec leading-[1.8] text-[15.5px] mb-[26px]">
                A community and youth-development initiative supported by Govind Group. Initiatives, dates and impact figures are CMS-managed — populated only with verified information, never estimated.
              </p>
              <div className="text-[11.5px] text-taupe border border-dashed border-stone px-4 py-2.5 inline-block tracking-[.03em] mb-5 bg-[rgba(217,210,197,.25)] !bg-transparent !border-[rgba(212,182,131,.35)] !text-ivory-sec">
                Initiative list, photography and impact statistics pending — to be supplied by the Foundation
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center p-10 h-full min-h-[280px] bg-[#0A0A0A] order-1 md:order-2">
              {/* <img src="[BASE64_IMAGE]" className="max-h-[170px] w-auto max-w-[90%]" alt="SKYF" /> */}
              <div className="text-ivory font-serif text-2xl text-center">Foundation Logo</div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
