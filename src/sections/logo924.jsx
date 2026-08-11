export const LogoMark = ({ className = "w-10 h-10", filled = false }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none">
    <path
      d="M200 60 C230 145 255 170 340 200 C255 230 230 255 200 340 C170 255 145 230 60 200 C145 170 170 145 200 60 Z"
      fill={filled ? "var(--color-primary)" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="14"
    />
    <circle cx="200" cy="200" r="18" fill="var(--color-highlight)" />
  </svg>
);
