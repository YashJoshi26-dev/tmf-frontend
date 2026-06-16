import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api/products.api';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { CollectionStrip } from '@/components/home/CollectionStrip';
import { FeatureBanner } from '@/components/home/FeatureBanner';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { Seo } from '@/components/common/Seo';

export default function Home() {
  const trending = useQuery({ queryKey: ['products', 'trending'], queryFn: () => productsApi.list({ sortBy: 'rating', limit: 8 }) });
  const newIn    = useQuery({ queryKey: ['products', 'newest'],   queryFn: () => productsApi.list({ sortBy: 'newest', limit: 8 }) });
  const bestSell = useQuery({ queryKey: ['products', 'best'],     queryFn: () => productsApi.list({ sortBy: 'rating', limit: 8 }) });

  return (
    <>
      <Seo />
      <HeroSlider />
      <CategoryTiles />

      <CollectionStrip
        eyebrow="What's Trending"
        title="Trending Sarees"
        description="Loved by our brides and bestselling this week."
        link="/collections"
        products={trending.data?.data || []}
        loading={trending.isLoading}
      />

      <FeatureBanner
        eyebrow="The Bridal Edit"
        title="A Wedding of Your Own"
        copy="From the first roka to the reception — a wardrobe woven for every celebration. Discover bridal lehengas, ceremonial silks and reception couture."
        image="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600"
        cta="Explore Bridal"
        link="/bridal"
      />

      <CollectionStrip
        eyebrow="Fresh Off the Loom"
        title="New Arrivals"
        link="/collections"
        products={newIn.data?.data || []}
        loading={newIn.isLoading}
      />

      <FeatureBanner
        eyebrow="Heritage Weaves"
        title="Banarasi, Reimagined"
        copy="Real zari, real silk, real heirlooms — modern silhouettes meet centuries-old craftsmanship."
        image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600"
        cta="Shop Banarasi"
        link="/category/saree/banarasi"
        reverse
      />

      <CollectionStrip
        eyebrow="Most Loved"
        title="Bestsellers"
        link="/collections"
        products={bestSell.data?.data || []}
        loading={bestSell.isLoading}
      />

      <Testimonials />
      <InstagramFeed />

      {/* Newsletter + Map */}
      <section className="bg-brand-charcoal py-5">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <NewsletterSignup />
            <div className="rounded-xl overflow-hidden border border-white/10 h-[280px]">
              <iframe
                src="https://maps.google.com/maps?q=75+Shekhawat+Market+1st+Floor+Sitlamata+Bazar+Indore+452007&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Maharaja Fashion Store"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}