import { createContext, useState, useContext, ReactNode } from "react";

// 1. Defining context data
interface StateContextType {
  user: any;
  email: any;
  id: any;
  age: any;
  profilePic: string | any;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setEmail: (email: any) => void;
  setID: (id: any) => void;
  setAge: (age:any) => void;
  setProfilePic: (profile_pic: string | any) => void;
}

// 2. Create the context
const stateContext = createContext<StateContextType>({
  user: null,
  token: null,
  email: null,
  id: null,
  age: null,
  profilePic: null,
  setUser: () => {},
  setToken: () => {},
  setEmail: () => {},
  setID: () => {},
  setAge: ()=> {},
  setProfilePic: ()=> {}
});

// 3. Define props type
interface ContextProviderProps {
  children: ReactNode;
}

// 4. Implement the provider
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, _setUser] = useState<any>(localStorage.getItem('username'));
  const [email, _setEmail] = useState<any>(localStorage.getItem('email'))
  const [id, _setID] = useState<any>(localStorage.getItem('id'))
  const [age, _setAge] = useState<any>(localStorage.getItem('age'))
  const [profilePic, _setProfilePic] = useState<any>(localStorage.getItem('profile_pic'))
  const [token, _setToken] = useState<string | null>(localStorage.getItem('access_token'))

  debugger;

  //#region setUser
  const setUser = (user:string | null) => {
    _setUser(user);
    if (user) {
      localStorage.setItem('username', user)
    } else {
      localStorage.removeItem('username')
    }
  }
  //#endregion
  
  //#region setToken
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };
  //#endregion

  const setEmail = (email: any) => {
    _setEmail(email)
    if(email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }

  const setID = (id:any) => {
    _setID(id)
    if(id) {
      localStorage.setItem('id', id)
    } else {
      localStorage.removeItem('id')
    }
  }

  const setAge = (age:any) => {
    _setAge(age)
    if(age) {
      localStorage.setItem('age', age)
    } else {
      localStorage.removeItem('age')
    }
  }

  const setProfilePic = (profilePic: string | any) => {
    _setProfilePic(profilePic)
    if(profilePic) {
      localStorage.setItem('profile_pic', profilePic)
    } else {
      localStorage.removeItem('profile_pic')
    }
  }


  return (
    <stateContext.Provider
      value={{
        user,
        token,
        email,
        id,
        age,
        profilePic,
        setUser,
        setToken,
        setEmail,
        setAge,
        setID,
        setProfilePic
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

// 5. Custom hook to use context
export const useStateContext = () => useContext(stateContext);
