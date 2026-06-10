import { CreditCard, IndianRupee, Banknote } from 'lucide-react';
import { cn } from '@/utils/cn';

const OPTIONS = [
  { value: 'razorpay', label: 'UPI / Cards / Netbanking', icon: CreditCard,  hint: 'Powered by Razorpay · Secure' },
  { value: 'cod',      label: 'Cash on Delivery',         icon: Banknote,    hint: 'Pay when you receive' },
  { value: 'stripe',   label: 'International Cards',      icon: IndianRupee, hint: 'Stripe' },
];

export const PaymentSelector = ({ value, onChange }) => (
  <div className="space-y-3">
    {OPTIONS.map((o) => {
      const active = o.value === value;
      const Icon = o.icon;
      return (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'w-full flex items-center gap-4 p-4 border text-left transition-colors',
            active ? 'border-brand-maroon bg-brand-maroon/5' : 'border-brand-cream hover:border-brand-charcoal'
          )}
        >
          <span className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
            active ? 'border-brand-maroon' : 'border-brand-cream'
          )}>
            {active && <span className="w-2.5 h-2.5 rounded-full bg-brand-maroon" />}
          </span>
          <Icon size={22} className="text-brand-muted" />
          <div className="flex-1">
            <p className="font-medium">{o.label}</p>
            <p className="text-xs text-brand-muted">{o.hint}</p>
          </div>
        </button>
      );
    })}
  </div>
);
