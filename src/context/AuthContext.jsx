import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import AuthReducer from './AuthReducers';

const intialState = {
  user: null,
};

export const AuthContext = createContext({
  state: intialState,
  dispatch: () => null,
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, intialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
