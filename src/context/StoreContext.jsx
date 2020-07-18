import React, { createContext, useReducer } from 'react';

const intialState = {
  stores: [],
};

const StoresReducers = (state, action) => {
  switch (action.type) {
    case 'SET_STORES': {
      return { ...state, stores: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const StoresContext = createContext({
  state: intialState,
  dispatch: () => null,
});

const StoresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoresReducers, intialState);
  return (
    <StoresContext.Provider value={[state, dispatch]}>
      {children}
    </StoresContext.Provider>
  );
};

export default StoresProvider;
