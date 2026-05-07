import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useBlog } from '../hooks/useBlog'
import '../style/navbar.css'

const Navbar = () => {
  const { isLogged, name, handleLogout } = useAuth();
  const { setSearch } = useBlog()


  return (
    <div className="navbar">
      <div className="nav-container">
        <span className="title">
          <Link to='/'>
            VOXLY
          </Link>
        </span>

        <input
          type="text"
          placeholder="Search blogs..."
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div>
          {isLogged ?
            <div className="username-nav-links">
              <span className="username">Welcome,{name}</span>
              <div className="nav-links">
                <Link to='/dashboard' className="nav-btn nav-primary">Dashboard</Link>
                <button onClick={handleLogout} className="nav-danger nav-btn">Logout
                </button>
              </div>
            </div> :
            <div className="auth-nav">
              <Link to='/login' className="nav-login nav-btn nav-primary">Login</Link>
              <Link to='/signup' className="nav-secondary nav-btn ">Signup</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar