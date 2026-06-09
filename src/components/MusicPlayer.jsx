import { useState, useRef, useEffect } from "react"; 
import { canciones } from "../assets/musica/canciones";


 
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [indexActual, setIndexActual] = useState(0);
const cancionActual = canciones[indexActual];
 
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(0.7);
  const [visible, setVisible] = useState(true);
 


  // El audio usa la canción actual:
<audio ref={audioRef} loop src={cancionActual.src} />

// Funciones para pasar canciones:
const siguiente = () => {
  const next = (indexActual + 1) % canciones.length;
  setIndexActual(next);
  // pequeño delay para que el src se actualice antes de reproducir
  setTimeout(() => { audioRef.current.play(); setPlaying(true); }, 50);
};

const anterior = () => {
  const prev = (indexActual - 1 + canciones.length) % canciones.length;
  setIndexActual(prev);
  setTimeout(() => { audioRef.current.play(); setPlaying(true); }, 50);
};

  // Formatear segundos a m:ss
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
 
  // Actualizar progreso mientras reproduce
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
 
    const onTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(formatTime(audio.currentTime));
    };
 
    const onLoaded = () => setDuration(formatTime(audio.duration));

    const onEnded = () => {
    const next = (indexActual + 1) % canciones.length;
    setIndexActual(next);
    setTimeout(() => { audioRef.current.play(); setPlaying(true); }, 50);
  };
 
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.volume = volume;
 
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [indexActual]);
 
  const togglePlay = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };
 
  const handleProgressClick = (e) => {
    const bar = progressRef.current;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  };
 
  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
  };
 
 
  return (
    <>
      <audio ref={audioRef}  src={canciones[indexActual].src} />
 
{!visible && (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-lg shadow-amber-400/30"
      >
        <span className={`text-black text-xl ${playing ? "animate-pulse" : ""}`}>♪</span>
      </button>
    )}

      {/* Contenedor flotante fijo abajo */}
      <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-85 sm:w-105 ${visible ? "block" : "hidden"}`}>
        <div className="relative bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
 
          {/* Botón cerrar */}
          <button
            onClick={() => { setVisible(false); }}
            className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors text-xs"
            aria-label="Cerrar reproductor"
          >
            ✕
          </button>
 
          {/* Info de la canción */}
          <div className="flex items-center gap-3 mb-3">
            {/* Ícono animado */}
            <div className={`shrink-0 w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center ${playing ? "animate-pulse" : ""}`}>
              <span className="text-amber-400 text-lg">♪</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{cancionActual.titulo}</p>
<p className="text-white/40 text-xs truncate">{cancionActual.artista}</p>
            </div>
          </div>
 
          {/* Barra de progreso */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1 bg-white/10 rounded-full cursor-pointer mb-1 relative group"
          >
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
            </div>
          </div>
 
          {/* Tiempos */}
          <div className="flex justify-between text-white/30 text-xs mb-4">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
 
          {/* Controles */}
          <div className="flex items-center justify-between">
 
            {/* Volumen */}
            <div className="flex items-center gap-2 w-28">
              <span className="text-white/40 text-xs">
                {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="w-full accent-amber-400 cursor-pointer h-1"
              />
            </div>
 
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-lg shadow-amber-400/30"
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              {playing ? (
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Anterior */}
<button onClick={anterior} className="text-white/50 hover:text-white transition-colors">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
</button>

{/* Play/Pause — ya lo tenés */}

{/* Siguiente */}
<button onClick={siguiente} className="text-white/50 hover:text-white transition-colors">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 18l8.5-6L6 6v12zm8.5-6v6h2V6h-2v6z"/>
  </svg>
</button>
 
            {/* Loop indicador */}
            <div className="w-28 flex justify-end">
              <span className="text-amber-400/60 text-xs tracking-widest uppercase flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Loop
              </span>
            </div>
 
          </div>
        </div>
      </div>
    </>
  );


}