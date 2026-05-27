import { forwardRef } from "react";
import paperBg from "../assets/imagenBG.jpeg";




const BookPage = forwardRef(({ image, text, imageStyle}, ref) => {
  return (
    <div
      ref={ref}
      style={imageStyle || {}}
      className="bg-[#f5efe3] w-full h-full p-6 border border-[#c7b299]"
    >
      <div className="w-full h-full flex flex-col">
        
        {/* FOTO */}
        <div className="flex-1 overflow-hidden rounded-2xl shadow-lg bg-white/35">
          <img
            src={image}
            alt="memory"
            style={imageStyle || {}}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXTO */}
        <div className="mt-6">
          <p className="text-[#3b2f2f] text-lg leading-relaxed text-center font-serif">
            {text}
          </p>
        </div>

      </div>
    </div>
  );
});

export default BookPage;