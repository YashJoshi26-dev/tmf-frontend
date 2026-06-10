export const EmptyState = ({ icon: Icon, title, message, action }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
    {Icon && <Icon size={48} className="text-brand-gold mb-4" strokeWidth={1.25} />}
    <h3 className="font-serif text-2xl mb-2">{title}</h3>
    {message && <p className="text-brand-muted mb-6 max-w-sm">{message}</p>}
    {action}
  </div>
);
