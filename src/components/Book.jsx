import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import fondoAlbum from "../estilos/Album.css";


const pages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    text: "Nuestro primer viaje juntos 🌅",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    text: "Un recuerdo que nunca vamos a olvidar ❤️",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    text: "Cada foto guarda una historia ✨",
  },
];

const Book = () => {
  return (
    <div className="w-full min-h-screen fondoAlbum flex items-center justify-center overflow-hidden ">
      <HTMLFlipBook
        width={500}
        height={700}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-2xl"
      >
        {pages.map((page) => (
          <BookPage
            key={page.id}
            image={page.image}
            text={page.text}
          />
        ))}
      </HTMLFlipBook>

      
    </div>
  );
};

export default Book;