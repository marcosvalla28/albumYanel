export default function WelcomeSection() {
  return (
    <main className="flex justify-center items-center px-6 py-10 font-sans">
      <div className="relative max-w-xl w-full bg-white border border-gray-200 rounded-2xl px-10 py-12 text-center overflow-hidden">

        {/* Barra superior verde */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-green-200 via-green-400 to-green-600 rounded-t-2xl" />

        {/* Ícono */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>

        {/* Título */}
        <h1 className="font-serif text-3xl font-medium text-gray-900 leading-snug mb-4">
          Bienvenidos a nuestro <br />
          <em className="italic text-green-600">álbum de recuerdos</em>
        </h1>

        {/* Divisor */}
        <div className="w-10 h-px bg-gray-200 mx-auto my-5" />

        {/* Texto */}
        <p className="text-sm font-light text-gray-500 leading-relaxed max-w-sm mx-auto">
          Este es nuestro álbum de fotos donde subiremos hermosos recuerdos
          y lo iremos actualizando con cada momento especial que queramos
          guardar para siempre.
        </p>

        {/* Badge */}
        <div className="mt-6">
          <span className="inline-block bg-green-50 text-green-800 text-xs px-4 py-1.5 rounded-lg">
            ♡ Siempre en construcción
          </span>
        </div>

        {/* Botón */}
        <div className="mt-5">
          <a
            href="/album"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2.5 rounded-lg transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Ver álbum
          </a>
        </div>

      </div>
    </main>
  );
}