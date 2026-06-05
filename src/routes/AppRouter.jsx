import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import AlbumBook from '../pages/AlbumBook'
import Navbar from '../components/Navbar' // ajustá el path
import Login from '../pages/Login';

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        onHome={() => navigate("/")}
        onLogin={() => navigate("/login")}
        onLogout={() => navigate("/")}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<AlbumBook />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

const AppRouter = () => {
  return <Layout />
}

export default AppRouter