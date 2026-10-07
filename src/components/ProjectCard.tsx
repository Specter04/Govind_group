import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { clsx } from 'clsx';
import { Reveal } from './Reveal';

export const ProjectCard = ({ project, delay = 0 }: { project: Project, delay?: number }) => {
  const clickable = !project.nameOnly;
  const thumb = project.gallery?.[0];

  const statusClass = clsx(
    "text-[10px] tracking-[.1em] uppercase font-bold px-2.5 py-1 inline-block mb-3 rounded-[1px]",
    {
      "bg-[rgba(184,146,85,.15)] text-gold border border-[rgba(184,146,85,.4)]": project.status === 'ongoing',
      "bg-[rgba(138,131,117,.12)] text-taupe border border-[rgba(138,131,117,.35)]": project.status === 'upcoming',
      "bg-[rgba(32,35,38,.06)] text-charcoal border border-[rgba(32,35,38,.2)]": project.status === 'completed',
    }
  );

  const statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1);

  const cardContent = (
    <div className={clsx("group transition-transform duration-400 ease-in-out hover:-translate-y-1", !clickable && "opacity-72 cursor-default hover:translate-y-0")}>
      <div 
        className="ph-image h-[280px]"
        style={thumb ? { backgroundImage: `url('${thumb}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {!thumb && (
          <span className="ph-label">{project.name}<br/>— hero photo pending —</span>
        )}
      </div>
      <div className="pt-[22px] px-[2px] pb-0">
        <span className={statusClass}>{statusLabel}</span>
        <h3 className="text-2xl mb-1.5">{project.name}</h3>
        <div className="text-[12.5px] text-taupe tracking-[.04em] mb-2.5">
          {project.location || ''}{project.type ? ' · ' + project.type : ''}
        </div>
        <div className={clsx("text-[11.5px] tracking-[.12em] uppercase font-bold flex items-center gap-1.5", clickable ? "text-navy" : "text-taupe")}>
          {clickable ? 'Explore' : 'Coming Soon'} 
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  );

  return (
    <Reveal delay={delay}>
      {clickable ? (
        <Link to={`/project/${project.slug}`} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Reveal>
  );
};
