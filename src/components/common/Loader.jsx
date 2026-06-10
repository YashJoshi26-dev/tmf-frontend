export const Loader = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-brand-muted">
    <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
    <p className="mt-4 text-sm uppercase tracking-[0.2em]">{label}</p>
  </div>
);

export const FullPageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Loader />
  </div>
);
