import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Counter } from '../components/Counter';
import { ProjectCard } from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';

export default function Home() {
  const { projects } = useProjects();
  const navigate = useNavigate();
  const featured = projects.filter(p => ['presidential', 'lifeville', 'westford'].includes(p.slug));

  const brandAssociations = ['Axis Bank', 'Jupiter Hospital', 'Raymond'];

  return (
    <div className="page active">
      <div className="min-h-screen relative flex items-center justify-center text-center text-ivory overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,146,85,.10),transparent_55%),radial-gradient(ellipse_at_50%_100%,rgba(0,0,0,.55),transparent_60%),linear-gradient(180deg,var(--navy-deep)_0%,var(--navy)_55%,var(--navy-mid)_100%)] before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.02)_0_1px,transparent_1px_3px)] before:opacity-40 before:pointer-events-none">
        <Reveal>
          <div className="relative z-10 mx-auto max-w-[760px] px-7">
            <div className="mx-auto mb-6 flex flex-col items-center">
              <div className="h-[56px] w-[48px] border border-gold border-dashed flex items-center justify-center text-[11px] text-gold font-sans tracking-widest mb-4">LOGO</div>
              <span className="text-[12px] tracking-[.22em] uppercase font-semibold text-gold">Govind Group</span>
            </div>
            <h1 className="text-[clamp(44px,7vw,92px)] leading-[1.05] text-ivory">
              Creating Spaces<br/>That Endure.
            </h1>
            <p className="text-[17px] text-ivory-sec max-w-[520px] mx-auto mt-5.5 leading-[1.7] font-normal">
              Real estate, hospitality and spaces shaped by a long-term vision — building across Pune since 1998.
            </p>
            <div className="flex gap-4.5 justify-center mt-10 flex-wrap">
              <div className="btn btn-primary" onClick={() => navigate('/creations')}>Explore Creations</div>
              <div className="btn btn-outline" onClick={() => navigate('/story')}>Our Story</div>
            </div>
          </div>
        </Reveal>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-[46px] bg-gradient-to-b from-gold to-transparent z-10"></div>
      </div>

      <section className="statement-texture text-center py-[100px] px-0">
        <div className="wrap">
          <Reveal>
            <p className="font-serif text-[clamp(26px,3.4vw,42px)] leading-[1.35] text-navy max-w-[820px] mx-auto m-0">
              From places to possibilities — Govind Group creates residential, commercial and hospitality environments designed to endure.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-[118px]">
        <div className="wrap">
          <div className="max-w-[640px] mb-[54px]">
            <Reveal>
              <span className="eyebrow">Featured</span>
              <h2 className="text-[clamp(34px,4.6vw,54px)] mt-3.5 leading-[1.1]">Featured Creations</h2>
              <p className="text-taupe text-base mt-4 leading-[1.7]">A selection of developments shaped by place, purpose and long-term thinking.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[34px]">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-ivory py-[118px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="ph-image h-[460px]">
              <span className="ph-label">Editorial Image<br/>— Architecture Detail —</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <span className="eyebrow mb-4 block">Since 1998</span>
              <h2 className="text-[clamp(30px,4vw,46px)] mb-5 leading-[1.15]">Our Story</h2>
              <p className="text-ivory-sec leading-[1.8] text-[15.5px] mb-[26px]">
                A family-owned group built on quality, trust and long-term thinking — spanning real estate under Govind Developers and hospitality under Govind Garden.
              </p>
              <div className="btn btn-outline" onClick={() => navigate('/story')}>Discover Our Story</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-navy-mid text-ivory pt-[120px]">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 text-center gap-0">
          <div className="px-6 relative before:content-[''] before:absolute before:-top-7 before:left-1/2 before:-translate-x-1/2 before:w-[22px] before:h-[1px] before:bg-[rgba(212,182,131,.5)]">
            <div className="font-sans font-extralight text-[clamp(30px,3.6vw,44px)] text-ivory tracking-[.02em] leading-none">
              <Counter value={1998} />
            </div>
            <div className="text-[10.5px] tracking-[.18em] uppercase text-gold-light mt-3.5 font-medium">Established</div>
          </div>
          <div className="px-6 relative before:content-[''] before:absolute before:-top-7 before:left-1/2 before:-translate-x-1/2 before:w-[22px] before:h-[1px] before:bg-[rgba(212,182,131,.5)]">
            <div className="font-sans font-extralight text-[clamp(30px,3.6vw,44px)] text-ivory tracking-[.02em] leading-none">
              <Counter value={15} />
            </div>
            <div className="text-[10.5px] tracking-[.18em] uppercase text-gold-light mt-3.5 font-medium">Creations</div>
          </div>
          <div className="px-6 relative before:content-[''] before:absolute before:-top-7 before:left-1/2 before:-translate-x-1/2 before:w-[22px] before:h-[1px] before:bg-[rgba(212,182,131,.5)]">
            <div className="font-sans font-extralight text-[clamp(30px,3.6vw,44px)] text-ivory tracking-[.02em] leading-none">
              0<Counter value={2} />
            </div>
            <div className="text-[10.5px] tracking-[.18em] uppercase text-gold-light mt-3.5 font-medium">Divisions</div>
          </div>
          <div className="px-6 relative before:content-[''] before:absolute before:-top-7 before:left-1/2 before:-translate-x-1/2 before:w-[22px] before:h-[1px] before:bg-[rgba(212,182,131,.5)]">
            <div className="font-sans font-extralight text-[clamp(30px,3.6vw,44px)] text-ivory tracking-[.02em] leading-none">
              Pune
            </div>
            <div className="text-[10.5px] tracking-[.18em] uppercase text-gold-light mt-3.5 font-medium">Maharashtra</div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap text-center">
          <Reveal>
            <span className="eyebrow">Trusted By</span>
            <h2 className="mt-3.5 text-[clamp(26px,3.4vw,36px)]">Brand Associations</h2>
            <div className="flex justify-center items-center gap-[60px] flex-wrap mt-[46px]">
              {brandAssociations.map((b, i) => (
                <div key={i} className="flex flex-col items-center justify-center h-[70px] w-[170px] border border-stone text-taupe font-sans text-[13px] tracking-[.08em] uppercase font-semibold grayscale opacity-65 transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  {b}
                  <span className="block text-[9px] tracking-[.06em] text-taupe mt-1 font-normal normal-case">logo pending</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[118px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div>
              <span className="eyebrow mb-4 block">Hospitality</span>
              <h2 className="text-[clamp(30px,4vw,46px)] mb-5 leading-[1.15]">Govind Garden</h2>
              <p className="text-taupe leading-[1.8] text-[15.5px] mb-[26px]">
                A multi-cuisine dining and events destination — North Indian, Italian &amp; Continental, Chinese, Maharashtrian and seafood, set within Govind Group's hospitality arm.
              </p>
              <div className="btn btn-dark" onClick={() => navigate('/hospitality#garden')}>Explore Govind Garden</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center p-10 h-full min-h-[280px] bg-garden-green">
              {/* <img src="[BASE64_IMAGE]" className="max-h-[170px] w-auto max-w-[90%]" alt="Govind Garden" /> */}
              <div className="text-ivory font-serif text-2xl text-center">Govind Garden Logo</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-ivory py-[118px]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <Reveal>
            <div className="flex items-center justify-center p-10 h-full min-h-[280px] bg-[#0A0A0A] order-2 md:order-1">
              {/* <img src="[BASE64_IMAGE]" className="max-h-[170px] w-auto max-w-[90%]" alt="SKYF" /> */}
              <div className="text-ivory font-serif text-2xl text-center">Foundation Logo</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="order-1 md:order-2">
              <span className="eyebrow mb-4 block">Social Impact</span>
              <h2 className="text-[clamp(30px,4vw,46px)] mb-5 leading-[1.15]">Shatrughna Kate<br/>Youth Foundation</h2>
              <p className="text-ivory-sec leading-[1.8] text-[15.5px] mb-[26px]">
                Community and youth-development initiatives supported by Govind Group — a sincere, ongoing commitment rather than a promotional exercise.
              </p>
              <div className="btn btn-outline" onClick={() => navigate('/hospitality#foundation')}>Learn More</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Careers</span>
            <h2 className="mt-3.5 text-[clamp(30px,4vw,44px)]">Build With Us</h2>
            <p className="text-taupe max-w-[520px] mx-auto mt-4.5 mb-7.5">Join a team shaping Pune's residential, commercial and hospitality landscape.</p>
            <div className="btn btn-dark inline-block" onClick={() => navigate('/careers')}>View Openings</div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 text-center bg-navy-mid">
        <div className="wrap">
          <Reveal>
            <h2 className="text-[clamp(30px,4vw,44px)] text-ivory mb-5.5">Let's Talk</h2>
            <div className="btn btn-primary inline-block" onClick={() => navigate('/contact')}>Get In Touch</div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
