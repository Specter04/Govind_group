import { useParams, Navigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';

export default function ProjectDetail() {
  const { projects } = useProjects();
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!project || project.nameOnly) {
    return <Navigate to="/creations" replace />;
  }

  const related = projects.filter(x => x.slug !== project.slug && !x.nameOnly).sort((a, b) => a.order - b.order).slice(0, 3);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="page active">
      <div className="min-h-[74vh] flex items-end relative bg-[linear-gradient(180deg,rgba(7,27,44,.35),rgba(7,27,44,.92)),linear-gradient(135deg,#173a54,#0a2136_70%)] text-ivory pt-[200px] px-0 pb-[60px]">
        <div className="wrap relative z-10 w-full">
          <Reveal>
            <span className="eyebrow block mb-4">{project.type}{project.flagship ? ' · Flagship' : ''}</span>
            <h1 className="text-[clamp(46px,7vw,88px)]">{project.name}</h1>
            <div className="mt-4 text-[15px] text-ivory-sec tracking-[.03em]">
              <b className="text-gold-light font-semibold">{project.location}</b> · {project.config || project.type}
            </div>
          </Reveal>
        </div>
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-stone max-w-[1240px] mx-auto">
          {project.highlights.map((h, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={clsx("p-[34px_30px]", i !== project.highlights!.length - 1 && "border-r border-stone")}>
                <div className="font-serif text-[30px] text-navy">{h[0]}</div>
                <div className="text-[11px] tracking-[.09em] uppercase text-taupe mt-1.5">{h[1]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {project.about && (
        <section className="py-[118px]">
          <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-[70px] items-center">
            <Reveal>
              <div>
                <span className="eyebrow block mb-4">About</span>
                <h2 className="text-[34px] mb-5 leading-[1.15]">{project.name}</h2>
                <p className="text-taupe leading-[1.8] text-[15.5px]">{project.about}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              {project.gallery && project.gallery[0] ? (
                <div className="ph-image light h-[460px]" style={{ backgroundImage: `url('${project.gallery[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              ) : (
                <div className="ph-image light h-[460px]"><span className="ph-label">Hero Image<br/>— to be added via CMS —</span></div>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {project.amenities && project.amenities.length > 0 && (
        <section className="py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px] mb-[54px]">
                <span className="eyebrow block mb-3">Amenities</span>
                <h2 className="text-[32px]">{project.amenities.length} Amenities</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.amenities.map((a, i) => (
                  <div key={i} className="border border-stone px-4.5 py-2.5 text-[13px] text-charcoal tracking-[.02em]">
                    {a}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {project.distances && project.distances.length > 0 && (
        <section className="py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px] mb-[54px]">
                <span className="eyebrow block mb-3">Key Distances</span>
                <h2 className="text-[32px]">Connectivity</h2>
              </div>
              <div className="border-t border-stone">
                {project.distances.map((d, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-stone text-[14.5px]">
                    <span className="text-charcoal">{d[0]}</span>
                    <span className="text-taupe">{d[1]}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {project.custom && project.custom.length > 0 && (
        <section className="py-20 bg-navy text-ivory">
          <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-[70px] items-center">
            <Reveal>
              {project.walkthrough ? (
                <div className="ph-image h-[460px] bg-[#0c2438]"><span className="ph-label">Walkthrough Thumbnail</span></div>
              ) : <div></div>}
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <span className="eyebrow block mb-4">Custom Section — flexible CMS block</span>
                <h2 className="text-[30px] text-ivory mb-5 leading-[1.15]">{project.custom[0][0]}</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.custom[0][1].map((c, i) => (
                    <div key={i} className="border border-stone px-4.5 py-2.5 text-[13px] tracking-[.02em] text-ivory">{c}</div>
                  ))}
                </div>
                {project.walkthrough && (
                  <a href={project.walkthrough} target="_blank" rel="noopener noreferrer" className="btn btn-outline inline-block mt-2.5">
                    Watch Walkthrough ↗
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px] mb-[54px]">
                <span className="eyebrow block mb-3">Gallery</span>
                <h2 className="text-[32px]">Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-3.5">
                {project.gallery.map((img, i) => (
                  <div key={i} className={clsx("relative overflow-hidden bg-[#0c2438] cursor-pointer", i === 0 && "col-span-2 row-span-2")} onClick={() => setLightboxImg(img)}>
                    <img src={img} className="w-full h-full object-cover block transition-transform duration-500 hover:scale-105" alt="Gallery item" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {(project.floorplan?.length || project.unitSchedule?.length) ? (
        <section className="py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px] mb-[54px]">
                <span className="eyebrow block mb-3">Floor Plan</span>
                <h2 className="text-[32px]">Floor Plan</h2>
              </div>
              {project.floorplan && project.floorplan.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-3.5">
                  {project.floorplan.map((img, i) => (
                    <div key={i} className={clsx("relative overflow-hidden bg-white cursor-pointer", i === 0 && "col-span-2 row-span-2")} onClick={() => setLightboxImg(img)}>
                      <img src={img} className="w-full h-full object-contain block" alt="Floorplan" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="text-[11.5px] text-taupe border border-dashed border-stone px-4 py-2.5 inline-block tracking-[.03em] mb-5 bg-[rgba(217,210,197,.25)]">
                    Detailed floor plans are vector CAD drawings — unit schedule below, full drawings available on request
                  </div>
                  <div className="border-t border-stone">
                    {project.unitSchedule?.map((r, i) => (
                      <div key={i} className="flex justify-between py-4 border-b border-stone text-[14.5px]">
                        <span className="text-charcoal font-bold">{r[0]}</span>
                        <span className="text-taupe">{r[1]} · {r[2]}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Reveal>
          </div>
        </section>
      ) : null}

      {project.specs && project.specs.length > 0 && (
        <section className="py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px] mb-[54px]">
                <span className="eyebrow block mb-3">Specifications</span>
                <h2 className="text-[32px]">Specifications</h2>
              </div>
              <div>
                {project.specs.map((s, i) => (
                  <div key={i} className={clsx("border-b border-stone", openAccordion === i ? "open" : "")}>
                    <div className="flex justify-between items-center py-5.5 px-1 cursor-pointer" onClick={() => toggleAccordion(i)}>
                      <h4 className="text-[18px] font-medium">{s[0]}</h4>
                      <span className={clsx("text-gold text-[18px] transition-transform duration-300", openAccordion === i && "rotate-45")}>+</span>
                    </div>
                    <div className={clsx("overflow-hidden transition-all duration-350 ease-in-out", openAccordion === i ? "max-h-[900px]" : "max-h-0")}>
                      <p className="px-1 pb-5.5 pt-0 text-taupe text-[14px] leading-[1.7]">{s[1].join(' · ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <div className="bg-navy text-ivory py-[70px] text-center">
        <div className="wrap">
          <Reveal>
            <h3 className="text-[clamp(28px,3.6vw,40px)] mb-6">Enquire About {project.name}</h3>
            <div className="btn btn-primary inline-block" onClick={() => window.dispatchEvent(new Event('openEnquireModal'))}>Enquire About This Creation</div>
          </Reveal>
        </div>
      </div>

      <section className="py-20">
        <div className="wrap">
          <Reveal>
            <div className="max-w-[640px] mb-[54px]">
              <span className="eyebrow block mb-3">Related</span>
              <h2 className="text-[32px]">Related Creations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={i * 0.1} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-[rgba(7,27,44,.94)] z-[900] flex flex-col items-center justify-center">
          <div className="absolute top-6 right-8 text-ivory text-2xl cursor-pointer" onClick={() => setLightboxImg(null)}>✕</div>
          <img src={lightboxImg} className="max-w-[88vw] max-h-[78vh] object-contain" alt="Enlarged view" />
        </div>
      )}
    </div>
  );
}
