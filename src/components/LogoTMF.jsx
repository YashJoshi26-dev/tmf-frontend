export const LogoTMF = ({ width = 260, height = 90 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 90"
    width={width}
    height={height}
  >
    <defs>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>
    </defs>

    {/* ── SILHOUETTE: woman in saree ── */}
    <g fill="#C9A84C" transform="translate(4, 4)">

      {/* Head */}
      <ellipse cx="20" cy="7" rx="4" ry="5" />

      {/* Neck */}
      <rect x="18.5" y="11.5" width="3" height="4" rx="1" />

      {/* Body / torso */}
      <path d="M14,15 C13,18 12,23 13,28 C14,33 16,37 17,42 L23,42 C24,37 26,33 27,28 C28,23 27,18 26,15 C24,13 22,12 20,12 C18,12 16,13 14,15 Z" />

      {/* Saree pallu — flowing up and to the right in a long curve */}
      <path d="
        M 22,13
        C 26,11 32,9 40,8
        C 52,7 64,8 76,7
        C 88,6 98,5 106,4
        C 112,3.5 116,3.5 118,5
        C 119,6 118,7.5 116,8
        C 110,9 100,9.5 90,10
        C 78,11 66,11.5 54,12
        C 44,12.5 36,13 30,14
        C 26,15 23,15 22,14 Z
      " opacity="0.95" />

      {/* Saree wrap around waist */}
      <path d="M13,28 C12,29 12,31 13,32 L27,32 C28,31 28,29 27,28 Z" opacity="0.6" />

      {/* Left leg */}
      <path d="M16,42 C15,50 14,57 13,64 C13,65 14,66 15,66 L18,66 C19,66 19,65 19,64 C19,57 19,50 19,42 Z" />

      {/* Right leg */}
      <path d="M21,42 C21,50 21,57 21,64 C21,65 22,66 23,66 L26,66 C27,66 28,65 27,64 C26,57 25,50 24,42 Z" />

      {/* Saree hem at feet */}
      <path d="M12,63 C14,61 18,60 22,60 C26,60 28,61 28,63 L26,66 L14,66 Z" opacity="0.5"/>
    </g>

    {/* ── VERTICAL DIVIDER ── */}
    <line x1="136" y1="10" x2="136" y2="80" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />

    {/* ── TEXT BLOCK ── */}

    {/* THE — small spaced caps */}
    <text
      x="148"
      y="30"
      fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
      fontSize="11"
      fontWeight="400"
      letterSpacing="5"
      fill="#C9A84C"
    >THE</text>

    {/* MAHARAJA — large bold */}
    <text
      x="144"
      y="58"
      fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
      fontSize="30"
      fontWeight="700"
      letterSpacing="1"
      fill="#C9A84C"
    >MAHARAJA</text>

    {/* TM superscript */}
    <text
      x="245"
      y="34"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="9"
      fontWeight="400"
      fill="#C9A84C"
    >™</text>

    {/* FASHION — small spaced caps */}
    <text
      x="168"
      y="74"
      fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
      fontSize="10"
      fontWeight="400"
      letterSpacing="7"
      fill="#C9A84C"
    >FASHION</text>

  </svg>
);