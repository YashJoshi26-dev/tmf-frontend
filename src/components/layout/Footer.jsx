import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MapPin, Phone } from 'lucide-react';

const COL = ({ title, links }) => (
  <div>
    <h4 className="eyebrow mb-3 text-xs">{title}</h4>
    <ul className="space-y-1.5 text-xs">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="text-white/50 hover:text-white transition-colors">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="bg-brand-charcoal text-brand-ivory">
    <div className="container-x py-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">

        {/* Brand */}
        <div className="col-span-2">
          <h3 className="font-serif text-xl tracking-wider">
            The Maharaja Fashion<span className="text-brand-gold">.</span>
          </h3>
          <p className="text-xs text-white/50 mt-2 italic">"Draping Dreams, Weaving Stories"</p>

          <div className="mt-4 space-y-2">
            <a href="https://maps.app.goo.gl/dsQuSuna7ZrQ7V4W7" target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 text-xs text-white/50 hover:text-brand-gold transition-colors">
              <MapPin size={12} className="mt-0.5 shrink-0 text-brand-gold" />
              <span>75 Shekhawat Market, 1st Floor, Sitlamata Bazar, Indore</span>
            </a>
            <a href="tel:+917869320513"
              className="flex items-center gap-2 text-xs text-white/50 hover:text-brand-gold transition-colors">
              <Phone size={12} className="shrink-0 text-brand-gold" />
              <span>+91 9755685159
              </span>
              <Phone size={12} className="shrink-0 text-brand-gold" />
              <span>+91 7869320513</span>
            </a>
          </div>

          <div className="flex gap-2 mt-4">
            <a href="https://www.instagram.com/maharaja_fashion159/" target="_blank" rel="noopener noreferrer"
              className="p-1.5 border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="p-1.5 border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="p-1.5 border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-colors">
              <Youtube size={14} />
            </a>
          </div>
        </div>

        <COL title="Shop" links={[
          { to: '/category/Sarees',   label: 'Sarees' },
          { to: '/category/lehenga', label: 'Lehengas' },
          { to: '/bridal',           label: 'Bridal' },
          { to: '/collections',      label: 'Collections' },
        ]} />

        <COL title="Help" links={[
          { to: '/contact',         label: 'Contact' },
          { to: '/faq',             label: 'FAQ' },
          { to: '/policy/shipping', label: 'Shipping' },
          { to: '/policy/returns',  label: 'Returns' },
        ]} />

        <COL title="Brand" links={[
          { to: '/about',          label: 'Our Story' },
          { to: '/wholesale',      label: 'Wholesale' },
          { to: '/policy/privacy', label: 'Privacy' },
          { to: '/policy/terms',   label: 'Terms' },
        ]} />
      </div>

      <div className="border-t border-white/10 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
      
       <p> Powered by <a href="https://diziveera.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Diziveera</a></p>
         <p>© {new Date().getFullYear()} The Maharaja Fashion. All rights reserved.</p>
      </div>
    </div>
  </footer>
);