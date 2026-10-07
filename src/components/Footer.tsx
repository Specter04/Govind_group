import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-navy-deep text-ivory-sec pt-20 px-0 pb-8 mt-auto">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(212,182,131,.15)]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* <img src="[BASE64_IMAGE]" alt="Govind Group" className="h-[30px]" /> */}
              <div className="font-serif text-ivory text-[19px] tracking-[.06em] leading-[1.05]">GOVIND GROUP</div>
            </div>
            <p className="text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed block">
              Real estate and hospitality developments across Pune, Maharashtra — since 1998.
            </p>
          </div>
          <div>
            <h4 className="text-ivory text-[12px] tracking-[.1em] uppercase font-sans font-bold mb-4.5">Creations</h4>
            <Link to="/creations?filter=ongoing" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Ongoing</Link>
            <Link to="/creations?filter=upcoming" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Upcoming</Link>
            <Link to="/creations?filter=completed" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Completed</Link>
          </div>
          <div>
            <h4 className="text-ivory text-[12px] tracking-[.1em] uppercase font-sans font-bold mb-4.5">Company</h4>
            <Link to="/story" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Our Story</Link>
            <Link to="/hospitality#garden" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Govind Garden</Link>
            <Link to="/hospitality#foundation" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Foundation</Link>
            <Link to="/careers" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">Careers</Link>
          </div>
          <div>
            <h4 className="text-ivory text-[12px] tracking-[.1em] uppercase font-sans font-bold mb-4.5">Contact</h4>
            <a href="tel:+919900581100" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">+91 99005 81100</a>
            <a href="mailto:info@thegovindgroup.com" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">info@thegovindgroup.com</a>
            <a href="https://thegovindgroup.com" target="_blank" rel="noopener" className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed hover:text-gold-light">thegovindgroup.com</a>
            <p className="block text-[13.5px] text-ivory-sec mb-2.5 leading-relaxed">Level 4, P.K. Chowk, Pimple Saudagar,<br/>Pune – 411027</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6 text-[11.5px] flex-wrap gap-2.5">
          <span>© 2026 Govind Group. All rights reserved.</span>
          <Link to="/admin" className="opacity-45 text-[10.5px] tracking-[.06em] uppercase border-b border-dotted border-[rgba(212,182,131,.4)] hover:opacity-90">Internal · Admin</Link>
        </div>
      </div>
    </footer>
  );
};
