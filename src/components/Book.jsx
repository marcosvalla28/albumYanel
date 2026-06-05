import {useState, useEffect} from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import "../estilos/Album.css";
import { foto1, foto10, foto11, foto12, foto13, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9, tapa } from "../assets/imgAlbum/imagenes";  

const pages = [
  {
    id: 0,
    image:
      tapa,
      imageStyle: { objectPosition: "top center", objectFit: "contain"},
      noPadding: true,
  },
  {
    id: 1,
    image:
      foto1,
    text: " Entonces te das cuenta que no es quien te mueve el piso, sino quiente centra 💕",
  },
  {
    id: 2,
    image:
      foto2,
    text: "No es quien te robe el corazon, sino quien te hace sentir que lo tienes de vuelta💖",
  },
  {
    id: 3,
    image:
      foto3,
    text: "Mi tactica es mirarte, aprender como sos, quererte como sos 💘",
  },
    {
    id: 4,
    image:
      foto4,
    text: "Mi tactica es hablarte y escucharte, contruir un puente indestructible 💘",
  },
    {
    id: 5,
    image:
      foto5,
    text: "tu tienes lo que busco, lo que deseo, lo que amo, tu lo tienes 😍",
  },
    {
    id: 6,
    image:
      foto6,
    text: "Eres la casualidad más bonita que llegó a mi vida 💖",
  },
    {
    id: 7,
    image:
      foto7,
    imageStyle: { objectPosition: "top center", objectFit: "contain"},
      text: "Podra nublarse el sol eternamente, podra secarse el mar, podra romperse el eje de la tierra como un débil cristal, pero jamás en mi vida podrá apagarse la llama de tu amor 💖",
  },
    {
    id: 8,
    image:
      foto8,
    text: "",
  },
    {
    id: 9,
    image:
      foto9,
    text: "",
  },
    {
    id: 10,
    image:
      foto10,
    text: "",
  },
    {
    id: 11,
    image:
      foto11,
    text: "",
  },
    {
    id: 12,
    image:
      foto12,
    text: "",
  },
    {
    id: 13,
    image:
      foto13,
      imageStyle: { objectPosition: "center 20%"},
    text: "",
  },
];


const width = Math.min(window.innerWidth * 0.8, 500);
const height = width * 1.4;

const Book = () => {
  const [firebasePages, setFirebasePages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const q = query(collection(db, "photos"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const fotos = snapshot.docs.map((d) => ({
        id: d.id,
        image: d.data().url,
        text: d.data().descripcion || "",
        imageStyle: {objectPosition: "center 20%"},
      }));
      setFirebasePages(fotos);
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  const allPages = [...pages, ...firebasePages];

  if (loading) return <div className="w-full min-h-screen fondoAlbum flex items-center justify-center text-white">Cargando...</div>;
  return (
    <div className="w-full min-h-screen fondoAlbum flex items-center justify-center overflow-hidden p-4">
      <HTMLFlipBook
        width={width}
        height={height}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-2xl"
      >
        {allPages.map((page) => (
          <BookPage
            key={page.id}
            image={page.image}
            text={page.text}
            imageStyle={page.imageStyle}
            noPadding={page.noPadding}
          />
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default Book;