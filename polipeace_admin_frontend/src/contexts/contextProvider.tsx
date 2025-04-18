import { createContext, useState, useContext, ReactNode } from "react";

// 1. Defining context data
interface StateContextType {
  user: any;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
}

// 2. Create the context
const stateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// 3. Define props type
interface ContextProviderProps {
  children: ReactNode;
}

// 4. Implement the provider
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, _setUser] = useState<any>(localStorage.getItem('username'));
  const [token, _setToken] = useState<string | null>(localStorage.getItem('access_token'));

  debugger;

  const setUser = (user:string | null) => {
    _setUser(user);
    if (user) {
      localStorage.setItem('username', user)
    } else {
      localStorage.removeItem('username')
    }
  }
  
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  return (
    <stateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

// 5. Custom hook to use context
export const useStateContext = () => useContext(stateContext);
