import React, { useEffect, useState } from "react";
import { useMainContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const onClickHendler = () => {
    authService.signOutMethod().then(() => {
      localStorage.removeItem("token");
      setToken("");
    });
  };

  const { user } = useMainContext();
  return (
    <div>
      Home page {user}
      <button onClick={onClickHendler}>Out</button>
    </div>
  );
};

export default Home;
