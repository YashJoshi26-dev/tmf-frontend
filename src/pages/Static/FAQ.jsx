import { Accordion } from '@/components/ui/Accordion';
import { Seo } from '@/components/common/Seo';

const ITEMS = [
  { title: 'How long does delivery take?',          content: '3-7 business days within India. International orders take 10-15 business days.' },
  { title: 'Do you offer Cash on Delivery?',        content: 'Yes, COD is available across most Indian pincodes for orders up to ₹15,000.' },
  { title: 'What is your return policy?',           content: 'Unworn items with original tags can be returned within 7 days of delivery. Bridal lehengas and customised orders are non-returnable.' },
  { title: 'Are the colors true to the photos?',    content: 'We photograph in natural daylight to keep colors accurate. Slight variation may occur due to monitor settings.' },
  { title: 'Do you offer bridal consultations?',    content: 'Yes — please use the wholesale/enquiry form or WhatsApp us to book a private appointment.' },
  { title: 'Do you ship internationally?',          content: 'We ship worldwide. International shipping rates are calculated at checkout.' },
];

export default function FAQ() {
  return (
    <div className="container-x py-16 max-w-3xl mx-auto">
      <Seo title="FAQ" />
      <h1 className="font-serif text-3xl md:text-5xl text-center">Frequently Asked</h1>
      <div className="mt-12">
        <Accordion items={ITEMS} />
      </div>
    </div>
  );
}
