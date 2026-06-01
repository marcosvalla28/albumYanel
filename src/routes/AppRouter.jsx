import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AlbumBook from '../pages/AlbumBook'
/* import AdminPanel from '../pages/AdminPanel' */
/* import Login from '../pages/login' */

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album" element={<AlbumBook />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/admin" element={<AdminPanel />} /> */}
    </Routes>
  )
}

export default AppRouter