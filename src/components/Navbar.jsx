import { useState, useEffect } from "react";

export default function Navbar({ onLogin, onHome, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action) action();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-6 bg-black/80 backdrop-blur-md border-b border-white/10">
        
        {/* Logo */}
        <a href="/" className="flex items-start">
          <img src="/src/assets/logo/logo.png" alt="Logo" className="w-25" />
        </a>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          className="flex flex-col justify-center gap-1.5 w-9 h-9 p-1 z-50 relative"
        >
          <span className={`block h-px bg-white rounded transition-all duration-300 ease-in-out hover:bg-[#aa7e35] ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px bg-white rounded transition-all duration-300 ease-in-out hover:bg-[#aa7e35] ${isOpen ? "opacity-0 w-0" : "w-full"}`} />
          <span className={`block h-px bg-white rounded transition-all duration-300 ease-in-out hover:bg-[#aa7e35] ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Drawer */}
              <aside
          className={`fixed top-0 right-0 h-full w-72 z-50 bg-neutral-950 border-l border-white/10 flex flex-col pt-20 pb-10 transition-transform duration-400 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          inert={!isOpen ? "" : undefined}
        >
        {/* Items principales */}
        <ul className="flex flex-col px-6 flex-1">
          <li className={`border-b border-white/10 transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`} style={{ transitionDelay: isOpen ? "80ms" : "0ms" }}>
            <button
              onClick={() => handleAction(onHome)}
              className="flex items-center gap-3 w-full py-4 text-sm tracking-widest uppercase text-neutral-400 hover:text-[#aa7e35] transition-colors duration-200 text-left"
            >
              <span>⌂</span> Volver a Home
            </button>
          </li>

          <li className={`border-b border-white/10 transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`} style={{ transitionDelay: isOpen ? "140ms" : "0ms" }}>
            <button
              onClick={() => handleAction(onLogin)}
              className="flex items-center gap-3 w-full py-4 text-sm tracking-widest uppercase text-neutral-400 hover:text-[#aa7e35] transition-colors duration-200 text-left"
            >
              <span>→</span> Iniciar Sesión
            </button>
          </li>
        </ul>

        {/* Cerrar sesión al fondo */}
        <div className={`px-6 pt-5 border-t border-white/10 transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`} style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}>
          <button
            onClick={() => handleAction(onLogout)}
            className="flex items-center gap-3 w-full py-2 text-sm tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors duration-200 text-left"
          >
            <span>✕</span> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

