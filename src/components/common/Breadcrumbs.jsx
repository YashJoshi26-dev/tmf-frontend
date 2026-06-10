import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/** items: [{ label, to? }] — last item is treated as the current page. */
export const Breadcrumbs = ({ items = [] }) => (
  <nav className="text-xs text-brand-muted uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
    <Link to="/" className="hover:text-brand-charcoal flex items-center gap-1">
      <Home size={12} /> Home
    </Link>
    {items.map((it, i) => (
      <span key={i} className="flex items-center gap-2">
        <ChevronRight size={12} />
        {it.to && i < items.length - 1
          ? <Link to={it.to} className="hover:text-brand-charcoal">{it.label}</Link>
          : <span className="text-brand-charcoal">{it.label}</span>}
      </span>
    ))}
  </nav>
);
