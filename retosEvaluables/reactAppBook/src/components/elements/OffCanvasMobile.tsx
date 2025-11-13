import { useEffect, useState, type ReactNode } from "react";

type OffCanvasMobileProps = {
  isOpen?: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  animationDuration?: number;
  children: ReactNode;
};

export default function OffCanvasMobile({
  isOpen = false,
  onClose,
  position = "bottom",
  animationDuration = 500,
  children,
}: OffCanvasMobileProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setMounted(true);
      // small delay to ensure browser paints the initial state before activating
      t = setTimeout(() => setActive(true), 20);
    } else {
      setActive(false);
      t = setTimeout(() => setMounted(false), animationDuration);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [isOpen, animationDuration]);

  if (!mounted) return null;

  let panelBase = "";
  let sideClass = "";
  let transformClass = "";

  switch (position) {
    case "left":
      panelBase = "left-0 top-0 bottom-0 w-full max-w-sm";
      sideClass = "left-0";
      transformClass = active ? "translate-x-0" : "-translate-x-full";
      break;
    case "right":
      panelBase = "right-0 top-0 bottom-0 w-full max-w-sm";
      sideClass = "right-0";
      transformClass = active ? "translate-x-0" : "translate-x-full";
      break;
    case "top":
      panelBase = "top-0 left-0 right-0 h-2/3";
      sideClass = "top-0";
      transformClass = active ? "translate-y-0" : "-translate-y-full";
      break;
    case "bottom":
    default:
      panelBase = "bottom-0 left-0 right-0 h-2/3";
      sideClass = "bottom-0";
      transformClass = active ? "translate-y-0" : "translate-y-full";
      break;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${animationDuration}ms` }}
        aria-hidden="true"
        onClick={() => onClose && onClose()}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute flex flex-col h-full ${sideClass} ${panelBase} ${transformClass} bg-white shadow-lg transform transition-transform`}
        style={{ transitionDuration: `${animationDuration}ms` }}>
        <div className="flex-1 overflow-auto">{children}</div>
      </aside>
    </div>
  );
}
