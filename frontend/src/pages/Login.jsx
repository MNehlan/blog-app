import { Link } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import '../style/login.css'

const Login = () => {
    const { email, password,setEmail, setPassword, handleLogin  } = useAuth();


    return (
        <div className="content">
            <div className="text">Login</div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="field">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Enter your email" />

                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input" placeholder="Enter your Password" />
                </div>
                <button type="submit" className="button">Login</button>
                <div className="action">Don't have an account?
                    <Link to='/signup'>Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login