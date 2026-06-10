import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <Seo title="Not Found" />
      <p className="eyebrow">404</p>
      <h1 className="heading-display mt-3">This page got lost in the drape</h1>
      <p className="text-brand-muted mt-3">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-8">Return Home</Link>
    </div>
  );
}
