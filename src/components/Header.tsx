import { useEffect, useState } from 'react';
import type { SVGProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const iconClass = "h-[22px] w-[22px] shrink-0";

const EnquireIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M4 6h11" />
    <path d="M4 11h8" />
    <path d="M4 16h5" />
    <path d="m14.5 18.5 4.7-4.7a1.7 1.7 0 0 1 2.4 2.4l-4.7 4.7-3.1.7.7-3.1Z" />
  </svg>
);

const ChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M20.4 11.7a8.3 8.3 0 0 1-12.2 7.4L4 20.2l1.1-4.1A8.3 8.3 0 1 1 20.4 11.7Z" />
    <path d="M8.7 8.6c.2-.6.5-.7.9-.7h.7c.2 0 .5 0 .7.5l.8 1.8c.1.3.1.5-.1.8l-.5.6c-.2.2-.2.4 0 .7.5.9 1.4 1.8 2.6 2.4.3.2.5.1.7-.1l.7-.8c.2-.2.5-.3.8-.2l1.8.8c.4.2.5.4.5.7 0 .8-.6 1.7-1.4 1.9-1.1.3-3.3-.2-5.5-2.3-2.1-2.1-2.7-4.2-2.4-5.2Z" />
  </svg>
);

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedMnav, setExpandedMnav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = clsx(
    "fixed top-0 left-0 right-0 z-[400] transition-all duration-500 ease-in-out border-b border-transparent",
    {
      "py-3.5 bg-[rgba(11,42,67,.97)] border-[rgba(212,182,131,.18)]": scrolled && isHome,
      "py-[22px]": !scrolled && isHome,
      "py-3.5 bg-navy border-[rgba(212,182,131,.18)]": !isHome, // Light mode equivalent for non-home
    }
  );

  const toggleMnav = (id: string) => {
    setExpandedMnav(prev => prev === id ? null : id);
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <>
      <header className={headerClasses}>
        <div className="wrap flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer" onClick={closeMobileNav}>
            <div className="h-[38px] w-[32px] border border-gold border-dashed flex items-center justify-center text-[9px] text-gold font-sans tracking-widest">LOGO</div>
            <div className="font-serif text-ivory text-[19px] tracking-[.06em] leading-[1.05]">
              GOVIND GROUP
              <span className="block font-sans text-[9px] tracking-[.28em] text-gold-light mt-0.5">REAL ESTATE · HOSPITALITY</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 min-[1500px]:gap-9">
            <div className="relative group">
              <Link to="/creations" className="text-[13px] tracking-[.1em] uppercase text-ivory font-semibold cursor-pointer py-1.5 flex items-center gap-1.5 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
                Creations <span className="text-[9px] text-gold-light translate-y-[1px]">▾</span>
              </Link>
              <div className="absolute top-[130%] left-1/2 -translate-x-1/2 -translate-y-1.5 bg-navy-deep border border-[rgba(212,182,131,.25)] min-w-[210px] py-2.5 opacity-0 pointer-events-none transition-all duration-250 shadow-[0_20px_40px_rgba(0,0,0,.35)] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 text-center">
                <Link to="/creations?filter=ongoing" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Ongoing</Link>
                <Link to="/creations?filter=upcoming" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Upcoming</Link>
                <Link to="/creations?filter=completed" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Completed</Link>
                <Link to="/creations?filter=affiliates" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Affiliates</Link>
              </div>
            </div>
            
            <div className="relative group">
              <Link to="/story" className="text-[13px] tracking-[.1em] uppercase text-ivory font-semibold cursor-pointer py-1.5 flex items-center gap-1.5 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
                The Making
              </Link>
            </div>
            
            <div className="relative group">
              <span className="text-[13px] tracking-[.1em] uppercase text-ivory font-semibold cursor-pointer py-1.5 flex items-center gap-1.5 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
                Social <span className="text-[9px] text-gold-light translate-y-[1px]">▾</span>
              </span>
              <div className="absolute top-[130%] left-1/2 -translate-x-1/2 -translate-y-1.5 bg-navy-deep border border-[rgba(212,182,131,.25)] min-w-[300px] py-2.5 opacity-0 pointer-events-none transition-all duration-250 shadow-[0_20px_40px_rgba(0,0,0,.35)] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 text-center">
                <Link to="/hospitality" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Govind Garden</Link>
                <Link to="/foundation" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Shatrughna Kate Youth Foundation</Link>
                <Link to="/journal" className="block px-[22px] py-2.5 text-[12px] tracking-[.08em] uppercase text-ivory-sec whitespace-nowrap hover:text-gold-light hover:bg-[rgba(212,182,131,.06)]">Journal / Updates</Link>
              </div>
            </div>
            
            <div className="relative group">
              <Link to="/contact" className="text-[13px] tracking-[.1em] uppercase text-ivory font-semibold cursor-pointer py-1.5 flex items-center gap-1.5 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
                Contact
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden min-[1500px]:flex items-center gap-6 text-ivory">
              <Link to="/contact" className="flex items-center gap-2 text-[13px] tracking-[.08em] uppercase font-semibold hover:text-gold-light transition-colors duration-300">
                <EnquireIcon className={iconClass} />
                Enquire
              </Link>
              <a href="https://wa.me/919900581100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] tracking-[.08em] uppercase font-semibold hover:text-gold-light transition-colors duration-300">
                <ChatIcon className={iconClass} />
                Chat
              </a>
              <button
                type="button"
                onClick={() => setSearchOpen(prev => !prev)}
                className="flex items-center gap-2 text-[13px] tracking-[.08em] uppercase font-semibold hover:text-gold-light transition-colors duration-300"
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
              >
                <SearchIcon className={iconClass} />
                Search
              </button>
            </div>
            <div className="md:hidden flex flex-col gap-1 cursor-pointer z-[410]" onClick={() => setMobileNavOpen(true)}>
              <span className="w-6 h-[1.5px] bg-ivory block transition-all duration-300"></span>
              <span className="w-6 h-[1.5px] bg-ivory block transition-all duration-300"></span>
              <span className="w-6 h-[1.5px] bg-ivory block transition-all duration-300"></span>
            </div>
          </div>
        </div>
        <div
          id="header-search-panel"
          className={clsx(
            "hidden min-[1500px]:block absolute right-10 top-full w-[320px] border border-[rgba(212,182,131,.25)] bg-navy-deep/95 p-3 shadow-[0_20px_40px_rgba(0,0,0,.35)] transition-all duration-300",
            searchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <label className="sr-only" htmlFor="site-search">Search</label>
          <input
            id="site-search"
            type="search"
            placeholder="Search creations, hospitality..."
            className="w-full border border-[rgba(212,182,131,.28)] bg-transparent px-4 py-3 text-[13px] text-ivory placeholder:text-ivory-sec focus:outline-none focus:border-gold"
          />
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={clsx("fixed inset-0 bg-navy-deep z-[600] flex flex-col pt-[100px] px-8 pb-10 overflow-y-auto transition-transform duration-500 ease-out", mobileNavOpen ? "translate-y-0" : "-translate-y-full")}>
        <div className="absolute top-7 right-7 text-ivory text-[22px] cursor-pointer" onClick={closeMobileNav}>✕</div>
        
        <div className="border-b border-[rgba(212,182,131,.15)] py-[18px]">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => { closeMobileNav(); }}>
            <Link to="/" className="font-serif text-[26px] text-ivory block w-full">Home</Link>
          </div>
        </div>

        <div className={clsx("border-b border-[rgba(212,182,131,.15)] py-[18px] transition-all overflow-hidden", expandedMnav === 'creations' && "max-h-[300px]")}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMnav('creations')}>
            <span className="font-serif text-[26px] text-ivory">Creations</span>
            <span className={clsx("text-gold transition-transform duration-300", expandedMnav === 'creations' && "rotate-180")}>▾</span>
          </div>
          <motion.div 
            initial={false}
            animate={{ height: expandedMnav === 'creations' ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Link to="/creations?filter=ongoing" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Ongoing</Link>
              <Link to="/creations?filter=upcoming" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Upcoming</Link>
              <Link to="/creations?filter=completed" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Completed</Link>
              <Link to="/creations?filter=affiliates" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Affiliates</Link>
            </div>
          </motion.div>
        </div>

        <div className="border-b border-[rgba(212,182,131,.15)] py-[18px]">
          <div className="flex items-center justify-between cursor-pointer" onClick={closeMobileNav}>
            <Link to="/story" className="font-serif text-[26px] text-ivory block w-full">The Making</Link>
          </div>
        </div>

        <div className={clsx("border-b border-[rgba(212,182,131,.15)] py-[18px] transition-all overflow-hidden")}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMnav('social')}>
            <span className="font-serif text-[26px] text-ivory">Social</span>
            <span className={clsx("text-gold transition-transform duration-300", expandedMnav === 'social' && "rotate-180")}>▾</span>
          </div>
          <motion.div 
            initial={false}
            animate={{ height: expandedMnav === 'social' ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Link to="/hospitality" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Govind Garden</Link>
              <Link to="/foundation" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Shatrughna Kate Youth Foundation</Link>
              <Link to="/journal" onClick={closeMobileNav} className="block py-2.5 pl-1.5 text-[14px] tracking-[.06em] uppercase text-ivory-sec">Journal / Updates</Link>
            </div>
          </motion.div>
        </div>

        <div className="border-b border-[rgba(212,182,131,.15)] py-[18px]">
          <div className="flex items-center justify-between cursor-pointer" onClick={closeMobileNav}>
            <Link to="/contact" className="font-serif text-[26px] text-ivory block w-full">Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
};
