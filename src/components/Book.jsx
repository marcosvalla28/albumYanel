import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import "../estilos/Album.css";
import { foto1, foto10, foto11, foto12, foto13, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9  } from "../assets/imgAlbum/imagenes";  

const pages = [
  {
    id: 1,
    image:
      foto1,
    text: "Nuestro primer viaje juntos 🌅",
  },
  {
    id: 2,
    image:
      foto2,
    text: "Un recuerdo que nunca vamos a olvidar ❤️",
  },
  {
    id: 3,
    image:
      foto3,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 4,
    image:
      foto4,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 5,
    image:
      foto5,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 6,
    image:
      foto6,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 7,
    image:
      foto7,
    imageStyle: { objectPosition: "top center", objectFit: "contain"},
      text: "Cada foto guarda una historia ✨",
  },
    {
    id: 8,
    image:
      foto8,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 9,
    image:
      foto9,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 10,
    image:
      foto10,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 11,
    image:
      foto11,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 12,
    image:
      foto12,
    text: "Cada foto guarda una historia ✨",
  },
    {
    id: 13,
    image:
      foto13,
    text: "Cada foto guarda una historia ✨",
  },
];


const width = Math.min(window.innerWidth * 0.8, 500);
const height = width * 1.4;

const Book = () => {
  return (
    <div className="w-full min-h-screen fondoAlbum flex items-center justify-center overflow-hidden p-4">
      <HTMLFlipBook
        width={width}
        height={height}
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