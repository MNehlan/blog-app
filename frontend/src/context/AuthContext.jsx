import { createContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api"

export const AuthContext = createContext();

const initialState = {
  isLogged: !!localStorage.getItem('token'),
  name: localStorage.getItem('userName') || '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLogged: true, name: action.payload };
    case 'LOGOUT':
      return { ...state, isLogged: false, name: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name)
      dispatch({ type: 'LOGIN', payload: data.name })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    dispatch({ type: 'LOGOUT' })
    navigate('/login');
  }


  return (
    <AuthContext.Provider
      value={{
        isLogged: state.isLogged, name: state.name,
        dispatch, email, password, setEmail, setPassword, handleLogin, handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
