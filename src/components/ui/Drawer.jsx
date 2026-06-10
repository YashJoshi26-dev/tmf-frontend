import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Drawer = ({ open, onClose, title, children, side = 'right', width = 'w-full sm:w-[420px]' }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  const fromRight = side === 'right';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              'fixed top-0 z-50 h-full bg-white shadow-luxe flex flex-col',
              width,
              fromRight ? 'right-0' : 'left-0',
            )}
            initial={{ x: fromRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: fromRight ? '100%' : '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-cream">
              <h3 className="font-serif text-xl">{title}</h3>
              <button onClick={onClose} className="text-brand-muted hover:text-brand-charcoal">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
