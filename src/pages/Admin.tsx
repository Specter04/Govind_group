import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useProjects } from '../context/ProjectContext';
import { Project } from '../data/projects';

export default function Admin() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const ongoing = projects.filter(p => p.status === 'ongoing').length;
  const upcoming = projects.filter(p => p.status === 'upcoming').length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const total = projects.length;

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const statusLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject({
      slug: '',
      name: '',
      status: 'upcoming',
      order: total + 1,
      type: '',
      location: '',
      about: '',
      gallery: [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(slug);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] text-charcoal font-sans">
      <div className="w-[260px] bg-white border-r border-[#e5e7eb] flex flex-col pt-5">
        <div className="px-5 mb-8">
          <div className="font-serif text-[22px] font-semibold text-navy">Govind CMS</div>
          <small className="text-[11px] tracking-[.06em] text-taupe uppercase font-semibold block mt-1">Internal Admin</small>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            {
              label: 'Dashboard',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              )
            },
            {
              label: 'Projects',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>
              )
            },
            {
              label: 'Careers',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              )
            },
            {
              label: 'Applications',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              )
            },
            {
              label: 'Enquiries',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )
            },
            {
              label: 'Hospitality',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              )
            },
            {
              label: 'Foundation',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              )
            },
            {
              label: 'Settings',
              icon: (
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              )
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className={clsx(
                "py-3 px-5 text-[14px] font-medium cursor-pointer transition-colors duration-200 flex items-center gap-3", 
                i === 1 ? "bg-[#f3f4f6] text-navy font-semibold" : "text-taupe hover:bg-[#f9fafb] hover:text-charcoal"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-[#e5e7eb]">
          <button 
            onClick={handleLogout} 
            className="text-[13.5px] text-red-500 font-semibold hover:underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[28px] font-semibold text-navy">Projects</h2>
          <div onClick={handleAdd} className="bg-navy text-white px-5 py-2.5 rounded-[4px] text-[14px] font-medium cursor-pointer hover:bg-navy-deep">+ Add New Project</div>
        </div>
        
        <div className="grid grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-[6px] border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,.05)]">
            <div className="text-[28px] font-semibold text-navy leading-none mb-2">{total}</div>
            <div className="text-[12px] uppercase tracking-[.05em] text-taupe font-semibold">Total Projects</div>
          </div>
          <div className="bg-white p-5 rounded-[6px] border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,.05)]">
            <div className="text-[28px] font-semibold text-navy leading-none mb-2">{ongoing}</div>
            <div className="text-[12px] uppercase tracking-[.05em] text-taupe font-semibold">Ongoing</div>
          </div>
          <div className="bg-white p-5 rounded-[6px] border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,.05)]">
            <div className="text-[28px] font-semibold text-navy leading-none mb-2">{upcoming}</div>
            <div className="text-[12px] uppercase tracking-[.05em] text-taupe font-semibold">Upcoming</div>
          </div>
          <div className="bg-white p-5 rounded-[6px] border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,.05)]">
            <div className="text-[28px] font-semibold text-navy leading-none mb-2">{completed}</div>
            <div className="text-[12px] uppercase tracking-[.05em] text-taupe font-semibold">Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-[6px] border border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,.05)] overflow-hidden">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Project</th>
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Status</th>
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Type</th>
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Location</th>
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Order</th>
                <th className="py-3.5 px-5 font-semibold text-taupe uppercase text-[11px] tracking-[.05em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...projects].sort((a,b) => a.order - b.order).map(p => (
                <tr key={p.slug} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                  <td className="py-3.5 px-5">
                    <b>{p.name}</b>
                    {p.nameOnly && <span className="ml-1.5 px-1.5 py-0.5 bg-[#fff8e1] text-gold border border-[rgba(184,146,85,.3)] rounded-[2px] text-[9.5px] uppercase tracking-[.08em] font-semibold">Name only</span>}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={clsx(
                      "px-2 py-1 text-[10px] tracking-[.05em] uppercase font-bold rounded-[2px]",
                      p.status === 'ongoing' && "bg-[rgba(184,146,85,.15)] text-gold border border-[rgba(184,146,85,.4)]",
                      p.status === 'upcoming' && "bg-[rgba(138,131,117,.12)] text-taupe border border-[rgba(138,131,117,.35)]",
                      p.status === 'completed' && "bg-[rgba(32,35,38,.06)] text-charcoal border border-[rgba(32,35,38,.2)]"
                    )}>
                      {statusLabel(p.status)}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-taupe">{p.type || '—'}</td>
                  <td className="py-3.5 px-5 text-taupe">{p.location || '—'}</td>
                  <td className="py-3.5 px-5 text-taupe">{p.order}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex gap-2.5 text-[12.5px] font-semibold text-navy">
                      <span onClick={() => handleEdit(p)} className="cursor-pointer hover:underline">Edit</span>
                      <span onClick={() => handleDelete(p.slug)} className="cursor-pointer text-[#dc2626] hover:underline">Delete</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/" className="fixed bottom-6 left-[285px] bg-charcoal text-white px-4 py-2.5 rounded-[4px] text-[13px] font-semibold tracking-[.05em] hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,.15)]">
          ← Exit to Public Site
        </Link>
      </div>

      {isModalOpen && editingProject && (
        <ProjectModal 
          project={editingProject} 
          onClose={() => setIsModalOpen(false)} 
          onSave={(p) => {
            const exists = projects.find(proj => proj.slug === p.slug);
            if (exists) {
              updateProject(p);
            } else {
              addProject(p);
            }
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose, onSave }: { project: Project, onClose: () => void, onSave: (p: Project) => void }) {
  const [formData, setFormData] = useState<Project>(project);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery ? [...prev.gallery, base64] : [base64]
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000] flex items-center justify-center font-sans p-5">
      <div className="bg-white rounded-[8px] shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#e5e7eb]">
          <h3 className="text-[20px] font-semibold text-navy">{project.slug ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={onClose} className="text-taupe hover:text-charcoal text-[20px]">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Slug (Unique ID)</label>
              <input name="slug" value={formData.slug} onChange={handleChange} disabled={!!project.slug} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px] bg-gray-50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px]">
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Order</label>
              <input name="order" type="number" value={formData.order} onChange={handleChange} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Type</label>
              <input name="type" value={formData.type || ''} onChange={handleChange} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px]" placeholder="e.g. Residential" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-charcoal">Location</label>
              <input name="location" value={formData.location || ''} onChange={handleChange} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-charcoal">About</label>
            <textarea name="about" value={formData.about || ''} onChange={handleChange} rows={4} className="p-2.5 border border-[#e5e7eb] rounded-[4px] text-[14px] resize-y"></textarea>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-charcoal flex justify-between">
              Gallery Images
              <button onClick={() => fileInputRef.current?.click()} className="text-navy hover:underline font-normal text-[11px]">+ Add Image</button>
            </label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <div className="flex flex-wrap gap-3 mt-2">
              {formData.gallery?.map((img, i) => (
                <div key={i} className="relative w-[100px] h-[100px] border border-[#e5e7eb] rounded-[4px] overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                  <button onClick={() => removeImage(i)} className="absolute inset-0 bg-[rgba(0,0,0,.5)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[20px]">&times;</button>
                </div>
              ))}
              {(!formData.gallery || formData.gallery.length === 0) && (
                <div className="text-[12.5px] text-taupe italic">No images added.</div>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-[#e5e7eb] flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-5 py-2.5 text-[14px] font-semibold text-charcoal hover:bg-gray-200 rounded-[4px]">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-5 py-2.5 text-[14px] font-semibold bg-navy text-white hover:bg-navy-deep rounded-[4px]">Save Project</button>
        </div>
      </div>
    </div>
  );
}
