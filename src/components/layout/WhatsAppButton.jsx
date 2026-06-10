import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const num = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const href = `https://wa.me/${num}?text=${encodeURIComponent('Hi! I\'m interested in your sarees.')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3.5 shadow-luxe transition-transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </a>
  );
};
