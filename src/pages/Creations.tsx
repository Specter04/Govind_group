import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { clsx } from 'clsx';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';

export default function Creations() {
  const { projects } = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    if (searchParams.get('filter')) {
      setFilter(searchParams.get('filter') as string);
    } else {
      setFilter('all');
    }
  }, [searchParams]);

  const updateFilter = (newFilter: string) => {
    setFilter(newFilter);
    setSearchParams({ filter: newFilter });
  };

  const filteredProjects = (filter === 'all' ? projects : projects.filter(p => p.status === filter))
    .slice()
    .sort((a, b) => a.order - b.order);

  return (
    <div className="page active">
      <div className="pt-[200px] px-0 pb-[90px] bg-gradient-to-b from-navy-deep to-navy text-ivory text-left">
        <div className="wrap relative z-10">
          <Reveal>
            <span className="eyebrow block mb-4">Portfolio</span>
            <h1 className="text-[clamp(42px,6vw,74px)]">Creations</h1>
            <p className="text-ivory-sec max-w-[560px] mt-4.5 text-base leading-[1.7]">
              A collection of spaces shaped by vision, place and purpose.
            </p>
          </Reveal>
        </div>
      </div>
      <section className="py-[118px]">
        <div className="wrap">
          <Reveal>
            <div className="flex gap-2.5 mb-[50px] flex-wrap">
              {['all', 'ongoing', 'upcoming', 'completed'].map((f) => (
                <div 
                  key={f}
                  className={clsx(
                    "px-5 py-2.5 text-[11.5px] tracking-[.1em] uppercase font-bold border cursor-pointer transition-all duration-250",
                    filter === f ? "bg-navy text-ivory border-navy" : "border-stone text-taupe bg-transparent hover:border-navy hover:text-navy"
                  )}
                  onClick={() => updateFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[34px]">
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={i * 0.05} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
