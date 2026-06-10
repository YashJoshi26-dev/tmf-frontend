import { Instagram } from 'lucide-react';
import BanarsiImg   from '@/assets/Banarasi.png';
import RajputaniImg from '@/assets/Rajputani.png';
import PatolaImg    from '@/assets/Patola.png';
import LehengaImg   from '@/assets/lehnga.png';
import BridalImg    from '@/assets/Bridal_saree.png';
import PashminaImg  from '@/assets/Pashmina_saree.png';

const FALLBACK = [
 
    {      image: BanarsiImg,   to: '/category/Sarees/banarasi' },
    {     image: RajputaniImg, to: '/category/rajputani' },
    {        image: PatolaImg,    to: '/category/Sarees/patola' },
   {  image: LehengaImg, to: '/category/Lehenga' },
    {  image: BridalImg,    to: '/bridal' },
    {      image: PashminaImg,  to: '/category/Sarees/pashmina' },

];

/** Wire up real Instagram Basic Display API later; this renders a tasteful fallback. */
export const InstagramFeed = ({ posts = FALLBACK }) => {
const handle = import.meta.env.VITE_INSTAGRAM_HANDLE || 'maharaja_fashion159';
  return (
    <section className="container-x py-16 md:py-24 text-center">
      <p className="eyebrow flex items-center justify-center gap-2"><Instagram size={14} />{handle}</p>
      <h2 className="heading-display mt-3">As Seen on Instagram</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mt-10">
        {posts.map((src, i) => (
          <a
            key={i}
            href={`https://instagram.com/${handle}`}
            target="_blank" rel="noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <img src={src.image} alt="Instagram post" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-brand-maroon/0 group-hover:bg-brand-maroon/40 transition-colors flex items-center justify-center">
              <Instagram className="opacity-0 group-hover:opacity-100 text-white transition" size={20} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
