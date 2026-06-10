import { Seo } from '@/components/common/Seo';

/** Generic policy page — keeps content close to layout so editors can update easily. */
export default function Policy({ title, sections = [] }) {
  return (
    <div className="container-x py-16 max-w-3xl mx-auto">
      <Seo title={title} />
      <h1 className="font-serif text-3xl md:text-5xl">{title}</h1>
      <div className="mt-10 space-y-8">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-serif text-xl mb-3">{s.heading}</h2>
            <p className="text-brand-muted leading-relaxed whitespace-pre-line">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export const Shipping = () => <Policy title="Shipping Policy" sections={[
  { heading: 'Delivery Times', body: 'Orders are dispatched within 24-48 hours.\nDomestic: 3-7 business days.\nInternational: 10-15 business days.' },
  { heading: 'Shipping Charges', body: 'Free shipping on orders above ₹1,999. Below that, a flat ₹99 is applied.' },
  { heading: 'Tracking',  body: 'A tracking link is emailed within 24 hours of dispatch.' },
]} />;



export const Privacy = () => <Policy title="Privacy Policy" sections={[
  { heading: 'Data We Collect',  body: 'Name, contact, address, and payment information necessary to fulfil your order.' },
  { heading: 'How We Use It',    body: 'To process orders, send updates, and improve your shopping experience.' },
  { heading: 'Third Parties',    body: 'We share data only with payment processors and shipping partners as required to fulfil orders.' },
]} />;

export const Terms = () => <Policy title="Terms & Conditions" sections={[
  { heading: 'Use of Site',      body: 'By using this site you agree to our terms. You must be 18 or older to place orders.' },
  { heading: 'Pricing',          body: 'All prices are in INR inclusive of taxes unless otherwise stated.' },
  { heading: 'Content Rights',   body: 'All images and copy are property of Saree Showroom. Unauthorised use is prohibited.' },
]} />;
