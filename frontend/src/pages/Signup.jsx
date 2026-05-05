import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useToast } from '../hooks/useToast'
import { useAuth } from "../hooks/useAuth"
import api from "../api/api"
import '../style/login.css'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/api/auth/signup', {
        name, email, password
      })

      setTimeout(async () => {
        const { data } = await api.post('/api/auth/login', {
          email, password
        })
        localStorage.setItem('token', data.token)
        dispatch({ type: 'LOGIN' });

        navigate('/')
      }, 1500)
    } catch (error) {
      showToast(error.response.data.message, 'error')
    }
  }


  return (
    <div className="content">
      <div className="text">Signup</div>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="field">
          <input type="text" onChange={(e) => setName(e.target.value)} className="input" placeholder="Enter Your Name" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Enter Your Email" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input" placeholder="Enter You Password" />
        </div>
        <button type="submit" className="button">Signup</button>
        <div className="action">Already have an account?
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;