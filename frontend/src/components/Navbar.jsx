import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import '../style/navbar.css'

const Navbar = () => {
  const { isLogged, dispatch } = useAuth();
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="nav-container">
        <span className="title">
          <Link to='/'>
            Blog App
          </Link>
        </span>

        <div>
          {isLogged ?
            <div className="nav-links">
              <Link to='/dashboard' className="nav-btn nav-primary">Dashboard</Link>
              <button onClick={handleLogout} className="nav-danger nav-btn">Logout
              </button>
            </div> :
            <div className="auth-nav">
              <Link to='/login' className="nav-login nav-btn nav-primary">Login</Link>
              <Link to='/signup' className="nav-secondary nav-btn ">Signup</Link>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar