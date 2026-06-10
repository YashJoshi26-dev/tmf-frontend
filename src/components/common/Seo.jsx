import { Helmet } from 'react-helmet-async';

const DEFAULTS = {
  title: 'Saree Showroom — Luxury Ethnic Wear',
  description: 'Discover Banarasi, Kanjivaram, Bridal & Designer sarees and lehengas. Handpicked premium ethnic wear.',
  image: '/og-default.jpg',
};

export const Seo = ({ title, description, image, type = 'website', jsonLd }) => {
  const t = title ? `${title} · Saree Showroom` : DEFAULTS.title;
  const d = description || DEFAULTS.description;
  const img = image || DEFAULTS.image;
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
