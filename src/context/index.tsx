import { createContext, ReactNode, useContext, useState } from "react";

interface IMainContext {
  user: string;
}

export const mainContext = createContext<IMainContext>({} as IMainContext);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("Kemal");

  const value = {
    user,
  };
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};

export const useMainContext = () => useContext<IMainContext>(mainContext);
