import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DashBoard from './pages/DashBoard'
import Navbar from './components/Navbar'
import SingleBlog from './pages/SingleBlog'
import Toast from './components/Toast'

function App() {

  return (
    <>
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Routes></>
  )
}

export default App
