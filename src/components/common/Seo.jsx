import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://themaharajafashion.com';
const SITE_NAME = 'The Maharaja Fashion';

const DEFAULTS = {
  title: 'The Maharaja Fashion – Luxury Ethnic Wear',
  description: 'Discover Banarasi, Kanjivaram, Bridal & Designer sarees and lehengas. Handpicked premium ethnic wear from Indore.',
  image: `${SITE_URL}/og-default.jpg`,
};

export const Seo = ({ title, description, image, type = 'website', canonical, jsonLd }) => {
  const t = title ? `${title} · ${SITE_NAME}` : DEFAULTS.title;
  const d = description || DEFAULTS.description;
  const img = image || DEFAULTS.image;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : null;

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};