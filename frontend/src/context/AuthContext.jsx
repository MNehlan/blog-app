import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  isLogged: !!localStorage.getItem('token'),
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLogged: true };
    case 'LOGOUT':
      return { ...state, isLogged: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        isLogged: state.isLogged,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
