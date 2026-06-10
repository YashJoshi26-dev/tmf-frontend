import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  // Compact page list with ellipsis
  const pages = [];
  const push = (p) => pages.push(p);
  push(1);
  if (page > 3) push('…');
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) push(p);
  if (page < totalPages - 2) push('…');
  if (totalPages > 1) push(totalPages);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 border border-brand-cream hover:bg-brand-cream disabled:opacity-40"
      ><ChevronLeft size={16} /></button>

      {pages.map((p, i) => (
        p === '…'
          ? <span key={`e${i}`} className="px-2 text-brand-muted">…</span>
          : <button
              key={p}
              onClick={() => onChange(p)}
              className={cn(
                'min-w-[40px] h-10 border text-sm',
                p === page
                  ? 'bg-brand-charcoal text-white border-brand-charcoal'
                  : 'border-brand-cream hover:bg-brand-cream'
              )}
            >{p}</button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 border border-brand-cream hover:bg-brand-cream disabled:opacity-40"
      ><ChevronRight size={16} /></button>
    </nav>
  );
};
