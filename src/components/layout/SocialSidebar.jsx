import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const SOCIALS = [
  {
    icon: <FaWhatsapp size={18} />,
    href: "https://wa.me/917869320513",
    bg: "#25D366",
    label: "WhatsApp",
  },
  {
    icon: <FaInstagram size={18} />,
    href: "https://www.instagram.com/maharaja_fashion159/",
    bg: "#E1306C",
    label: "Instagram",
  },
  {
    icon: <FaFacebookF size={18} />,
    href: "#",
    bg: "#1877F2",
    label: "Facebook",
  },
  {
    icon: <FaYoutube size={18} />,
    href: "#",
    bg: "#FF0000",
    label: "YouTube",
  },
];

export default function SocialSidebar() {
  return (
    // Only on desktop — mobile has MobileBottomNav
    <div className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-1.5">
      {SOCIALS.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          initial={{ x: -4, opacity: 0.85 }}
          whileHover={{ x: 0, opacity: 1 }}
          className="group flex items-center overflow-hidden text-white rounded-r-xl shadow-md"
          style={{
            background: s.bg,
            width: 40,
            transition: "width 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.width = "120px")}
          onMouseLeave={(e) => (e.currentTarget.style.width = "40px")}
        >
          <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
            {s.icon}
          </span>
          <span className="text-xs font-bold pr-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {s.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}