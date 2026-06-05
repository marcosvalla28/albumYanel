import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import Swal from "sweetalert2";

const CLOUDINARY_CLOUD_NAME = "drvmacqrk";
const CLOUDINARY_UPLOAD_PRESET = "album_fotos";

export default function AdminComponent() {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setPhotos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar las fotos.", confirmButtonColor: "#aa7e35" });
    } finally {
      setLoadingPhotos(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setProgress(0);

    try {
      // Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      // Simular progreso mientras sube
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Error al subir a Cloudinary");
      }

      const data = await response.json();
      const url = data.secure_url;
      const cloudinaryId = data.public_id;

      setProgress(100);

      // Guardar URL + descripción en Firestore
      await addDoc(collection(db, "photos"), {
        url,
        cloudinaryId,
        descripcion: descripcion || "",
        createdAt: serverTimestamp(),
      });

      setSelectedFile(null);
      setPreview(null);
      setDescripcion("");
      setProgress(0);
      fileInputRef.current.value = "";
      setUploading(false);
      fetchPhotos();
      Swal.fire({
        icon: "success",
        title: "Foto subida",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({ icon: "error", title: "Error inesperado", text: "Intentá de nuevo.", confirmButtonColor: "#aa7e35" });
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (photo) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Borrar foto?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#c0392b",
      cancelButtonColor: "#aa7e35",
    });
    if (!result.isConfirmed) return;

    try {
      // Solo borramos de Firestore (borrar de Cloudinary requiere backend)
      await deleteDoc(doc(db, "photos", photo.id));
      fetchPhotos();
      Swal.fire({ icon: "success", title: "Foto borrada", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error al borrar", confirmButtonColor: "#aa7e35" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* Header */}
      <header className="border-b border-[#aa7e35]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#aa7e35]/20 border border-[#aa7e35]/50 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#aa7e35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <span className="text-[#aa7e35] font-medium text-sm tracking-wide">Panel admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-400 hover:text-[#aa7e35] border border-zinc-700 hover:border-[#aa7e35]/50 px-3 py-1.5 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Upload section */}
        <section className="bg-zinc-900 border border-[#aa7e35]/30 rounded-2xl p-6">
          <h2 className="text-[#aa7e35] font-medium text-sm uppercase tracking-widest mb-5">Subir nueva foto</h2>

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-[#aa7e35]/30 hover:border-[#aa7e35]/60 rounded-xl min-h-44 flex items-center justify-center cursor-pointer transition overflow-hidden mb-4"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full max-h-64 object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-2 py-8 text-zinc-500">
                <svg className="w-8 h-8 text-[#aa7e35]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="text-sm">Clic para seleccionar imagen</span>
                <span className="text-xs text-zinc-600">JPG, PNG, WEBP</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mb-4">
            <label className="text-xs font-medium text-[#bc9f6f] block mb-1.5">Descripción</label>
            <textarea
              rows={3}
              placeholder="Escribí una descripción para la foto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-800 border border-zinc-700 focus:border-[#aa7e35]/60 rounded-lg outline-none text-white placeholder:text-zinc-600 resize-none transition"
            />
          </div>

          {uploading && (
            <div className="mb-4">
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#aa7e35] rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">{progress}%</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition
              ${!selectedFile || uploading
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-[#aa7e35] text-zinc-900 hover:bg-[#bc9f6f] active:scale-95"
              }`}
          >
            {uploading ? `Subiendo... ${progress}%` : "Subir foto"}
          </button>
        </section>

        {/* Photos grid */}
        <section>
          <h2 className="text-[#aa7e35] font-medium text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
            Fotos subidas
            <span className="bg-[#aa7e35]/20 text-[#aa7e35] text-xs px-2 py-0.5 rounded-full">{photos.length}</span>
          </h2>

          {loadingPhotos ? (
            <p className="text-zinc-500 text-sm">Cargando fotos...</p>
          ) : photos.length === 0 ? (
            <p className="text-zinc-500 text-sm">No hay fotos subidas todavía.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-zinc-900 border border-[#aa7e35]/20 rounded-xl overflow-hidden flex flex-col">
                  <img
                    src={photo.url}
                    alt={photo.descripcion || "foto"}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    {photo.descripcion ? (
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{photo.descripcion}</p>
                    ) : (
                      <p className="text-xs text-zinc-600 italic">Sin descripción</p>
                    )}
                    <button
                      onClick={() => handleDelete(photo)}
                      className="mt-auto text-xs text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-500/50 px-3 py-1.5 rounded-lg transition"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}