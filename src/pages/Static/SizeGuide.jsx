import { Seo } from '@/components/common/Seo';

const ROWS = [
  ['XS',  '32', '26', '34'],
  ['S',   '34', '28', '36'],
  ['M',   '36', '30', '38'],
  ['L',   '38', '32', '40'],
  ['XL',  '40', '34', '42'],
  ['XXL', '42', '36', '44'],
];

export default function SizeGuide() {
  return (
    <div className="container-x py-16 max-w-3xl mx-auto">
      <Seo title="Size Guide" />
      <h1 className="font-serif text-3xl md:text-5xl">Size Guide</h1>
      <p className="text-brand-muted mt-3">All measurements in inches</p>

      <table className="w-full mt-10 text-sm">
        <thead className="bg-brand-cream">
          <tr><th className="p-3 text-left">Size</th><th className="p-3">Bust</th><th className="p-3">Waist</th><th className="p-3">Hip</th></tr>
        </thead>
        <tbody className="divide-y divide-brand-cream">
          {ROWS.map((r) => (
            <tr key={r[0]}><td className="p-3 font-medium">{r[0]}</td><td className="p-3 text-center">{r[1]}</td><td className="p-3 text-center">{r[2]}</td><td className="p-3 text-center">{r[3]}</td></tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 text-sm text-brand-muted space-y-2">
        <p><strong>Bust:</strong> Measure around the fullest part of your bust.</p>
        <p><strong>Waist:</strong> Measure around the narrowest part of your natural waistline.</p>
        <p><strong>Hip:</strong> Measure around the fullest part of your hips.</p>
      </div>
    </div>
  );
}
