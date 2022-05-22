import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "../context";
import "./firebaseConfig";

interface IMainProvider {
  children: ReactNode;
}

const MainProvider = ({ children }: IMainProvider) => {
  return (
    <BrowserRouter>
      <MainContextProvider>{children}</MainContextProvider>
    </BrowserRouter>
  );
};

export default MainProvider;
