import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Swal from "sweetalert2";

export default function LoginComponente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Sesión iniciada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      const messages = {
        "auth/user-not-found": "No existe una cuenta con ese email.",
        "auth/wrong-password": "Contraseña incorrecta.",
        "auth/invalid-credential": "Email o contraseña incorrectos.",
        "auth/too-many-requests": "Demasiados intentos. Esperá unos minutos.",
      };
      Swal.fire({
        icon: "error",
        title: "Error al ingresar",
        text: messages[err.code] || "Ocurrió un error. Intentá de nuevo.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#111",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 z-10 relative">
      <div className="bg-zinc-900/80 border border-[#aa7e35]/80 rounded-2xl p-10 w-full max-w-sm shadow-sm">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#aa7e35]/45 border border-[#aa7e35]/80 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-[#aa7e35]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <h1 className="text-4xl font-semibold text-[#aa7e35]">Book de fotos</h1>
          <p className="text-sm text-[#bc9f6f] mt-1">Panel de administración</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#bc9f6f]">Email</label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition bg-white text-neutral-900 placeholder:text-neutral-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#bc9f6f]">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition bg-white text-neutral-900 placeholder:text-neutral-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-1 w-full py-2.5 rounded-lg text-sm font-medium transition
              ${loading
                ? "bg-[#aa7e35] text-[#bc9f6f] cursor-not-allowed"
                : "bg-[#aa7e35] text-[#2c1b00] hover:bg-[#aa7e35]/35 active:scale-95"
              }`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}