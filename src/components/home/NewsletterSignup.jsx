import { useState } from 'react';
import toast from 'react-hot-toast';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error('Please enter a valid email');
    setLoading(true);
    setTimeout(() => {
      toast.success('Welcome to the list ✨');
      setEmail('');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="text-brand-ivory">
      <p className="eyebrow text-brand-gold tracking-widest text-xs">Stay In Style</p>
      <h2 className="font-serif text-2xl md:text-3xl mt-3 text-brand-ivory">
        Letters from the Atelier
      </h2>
      <p className="text-white/50 mt-2 text-sm leading-relaxed">
        New arrivals & private edits — delivered with grace.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 bg-transparent border border-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold placeholder:text-white/40 text-white"
        />
        <button type="submit" disabled={loading} className="btn-gold whitespace-nowrap">
          {loading ? '…' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};