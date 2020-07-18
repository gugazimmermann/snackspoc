import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const intialState = {
  user: {
    update: false,
    id: null,
    name: null,
    email: null,
    avatar: 'user.png',
    area: 2500,
    city: {
      long_name: null,
      short_name: null,
    },
    state: {
      long_name: null,
      short_name: null,
    },
  },
};

const UserReducers = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: intialState };
    }
    default: {
      return state;
    }
  }
};

export const UserContext = createContext({
  state: intialState,
  dispatch: () => null,
});

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducers, intialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
