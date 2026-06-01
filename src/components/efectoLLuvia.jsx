import { corazon1, corazon2} from "../assets/imgAlbum/imagenes";




function EfectoLluvia() {

    const notes = [corazon1, corazon2];


  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 25 }).map((_, i) => {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const left = Math.random() * 100;
        const duration = 11 + Math.random() * 11;
        const delay = Math.random() * 5;
        const size = 1 + Math.random() * 1.5;

        return (
          <img
            key={i}
            src={note}
            alt="nota musical"
            className="absolute opacity-80"
            style={{
              left: `${left}%`,
              top: `-10%`,
              width: `${size * 30}px`,
              height: 'auto',
              animation: `fall ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10%) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}

export default EfectoLluvia