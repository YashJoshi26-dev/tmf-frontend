import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function StoreMap() {
  return (
    <section className="bg-brand-cream py-16">
      <div className="container-x">
        <div className="text-center mb-10">
          <p className="eyebrow text-brand-gold">Visit Us</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 text-brand-charcoal">
            Find Our Store
          </h2>
          <p className="text-brand-muted mt-2 text-sm">
            Come experience the finest sarees & lehengas in person
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-stretch">

          {/* Google Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-brand-gold/20 min-h-[380px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.8!2d75.8573!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTEnMjYuMyJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&q=75+Shekhawat+Market+Sitlamata+Bazar+Indore"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Maharaja Fashion Store Location"
            />
          </motion.div>

          {/* Store Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-charcoal text-brand-ivory rounded-2xl p-8 flex flex-col justify-between shadow-lg"
          >
            <div>
              <h3 className="font-serif text-2xl text-brand-gold">
                The Maharaja Fashion
              </h3>
              <p className="text-white/60 text-sm mt-1 italic">
                "Draping Dreams, Weaving Stories"
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <FiMapPin size={18} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      75 Shekhawat Market, 1st Floor,<br />
                      Sitlamata Bazar, Indore (M.P.)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone size={18} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+919755685159" className="text-sm text-white/80 hover:text-brand-gold transition-colors">
                      +91 9755685159
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock size={18} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Store Hours</p>
                    <p className="text-sm text-white/80">Mon – Sat: 10:00 AM – 8:00 PM</p>
                    <p className="text-sm text-white/80">Sunday: 11:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://maps.app.goo.gl/dsQuSuna7ZrQ7V4W7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-center text-sm py-3 rounded-lg font-medium"
              >
                📍 Get Directions
              </a>
              <a
                href="https://wa.me/917869320513"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm py-3 rounded-lg font-medium hover:bg-[#1ea855] transition-colors"
              >
                <FaWhatsapp size={16} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
