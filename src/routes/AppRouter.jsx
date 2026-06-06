import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import AlbumBook from '../pages/AlbumBook'
import Navbar from '../components/Navbar' 
import Login from '../pages/login';
import AdminPanel from '../pages/AdminPanel';
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        onHome={() => navigate("/")}
        onLogin={() => navigate("/login")}
        onLogout={async () => {
  await signOut(auth);
  navigate("/");
}}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<AlbumBook />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

const AppRouter = () => {
  return <Layout />
}

export default AppRouter