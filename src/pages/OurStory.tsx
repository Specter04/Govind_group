import { Reveal } from '../components/Reveal';

export default function OurStory() {
  return (
    <div className="page active">
      <div className="pt-[200px] px-0 pb-[90px] bg-gradient-to-b from-navy-deep to-navy text-ivory text-left">
        <div className="wrap relative z-10">
          <Reveal>
            <span className="eyebrow block mb-4">Est. 1998</span>
            <h1 className="text-[clamp(42px,6vw,74px)]">Our Story</h1>
            <p className="text-ivory-sec max-w-[560px] mt-4.5 text-base leading-[1.7]">
              A family-owned group building considered spaces across Pune for over two decades.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="py-[90px] border-b border-stone">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="ph-image light h-[460px]"><span className="ph-label">Editorial Image — Origins</span></div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <span className="eyebrow block mb-4">Origins</span>
              <h2 className="text-[32px] mb-5 leading-[1.15]">1998 — The Beginning</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                Govind Group was established in 1998 in PCMC, Pune, as a family-owned conglomerate. Founding narrative details are CMS-editable — to be populated by the Govind Group team.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="py-[90px] border-b border-stone">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="order-2 md:order-1">
              <span className="eyebrow block mb-4">Evolution</span>
              <h2 className="text-[32px] mb-5 leading-[1.15]">Two Divisions, One Vision</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                Govind Developers (real estate, est. 2012) and Govind Garden (hospitality) grew from the same founding principles of trust and long-term thinking.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="ph-image light h-[460px] order-1 md:order-2"><span className="ph-label">Editorial Image — Evolution</span></div>
          </Reveal>
        </div>
      </div>

      <div className="py-[90px] border-b border-stone">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="ph-image light h-[460px]"><span className="ph-label">Editorial Image — Philosophy</span></div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <span className="eyebrow block mb-4">Philosophy</span>
              <h2 className="text-[32px] mb-5 leading-[1.15]">Quiet Confidence</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                Content pending — CMS-editable field. To be written by Govind Group leadership.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="py-[90px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="order-2 md:order-1">
              <span className="eyebrow block mb-4">People &amp; Approach</span>
              <h2 className="text-[32px] mb-5 leading-[1.15]">Built By People, For People</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                Content pending — CMS-editable field.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="ph-image light h-[460px] order-1 md:order-2"><span className="ph-label">Editorial Image — People</span></div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
