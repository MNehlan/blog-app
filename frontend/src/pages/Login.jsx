import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import api from "../api/api"
import '../style/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch } = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        const { data } = await api.post('/api/auth/login', { email, password })

        localStorage.setItem('token', data.token)
        dispatch({ type: 'LOGIN' })
        navigate('/')
    }

    return (
        <div className="content">
            <div className="text">Login</div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="field">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Enter your email"/>

                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input" placeholder="Enter your Password"/>
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