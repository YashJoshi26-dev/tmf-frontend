export function KpiTile({ title, value, icon: Icon, trend, trendLabel, color = 'maroon' }) {
  const colors = {
    maroon: 'bg-brand-maroon text-white',
    gold:   'bg-brand-gold text-white',
    green:  'bg-emerald-600 text-white',
    blue:   'bg-blue-600 text-white',
  };

  return (
    <div className="bg-white rounded-xl border border-brand-cream p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-brand-charcoal/60 font-medium">{title}</span>
        <span className={`p-2 rounded-lg ${colors[color] ?? colors.maroon}`}>
          <Icon size={18} />
        </span>
      </div>
      <div className="text-2xl font-serif font-semibold text-brand-charcoal">{value}</div>
      {trend !== undefined && (
        <div className={`text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% {trendLabel}
        </div>
      )}
    </div>
  );
}