import React from "react";

// React
import { useState, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AppContext.Provider
      value={{
        expanded,
        setExpanded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
