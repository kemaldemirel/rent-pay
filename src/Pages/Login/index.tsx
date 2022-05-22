import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./login.module.scss";
import { box, title, input, btn } from "./material.styles";
import Button from "@mui/material/Button";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

interface IAuthData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<IAuthData>({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPswd, setErrorPswd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHendler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAuthData({
      ...authData,
      [name]: value.trim(),
    });
  };

  const onSubmitHendler = () => {
    authData.email ? setErrorEmail(false) : setErrorEmail(true);
    authData.password ? setErrorPswd(false) : setErrorPswd(true);

    setLoading(true);

    authService
      .authMethod({ email: authData.email, password: authData.password })
      .then((user) => {
        //@ts-ignore
        localStorage.setItem("token", user.user.accessToken);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });

    setAuthData({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.login}>
      <Box component="form" sx={box} autoComplete="off">
        <Typography sx={title} align="center" variant="h1">
          Войти в систему
        </Typography>
        <TextField
          name="email"
          value={authData.email}
          error={errorEmail}
          helperText={errorEmail && "Необходимо заполнить поле"}
          sx={input}
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          required
          onChange={(e) => onChangeHendler(e)}
        />
        <TextField
          name="password"
          value={authData.password}
          error={errorPswd}
          helperText={errorPswd && "Необходимо заполнить поле"}
          sx={input}
          id="outlined-basic2"
          type="password"
          label="Пароль"
          variant="outlined"
          required
          onChange={(e) => onChangeHendler(e)}
        />
        <Button sx={btn} variant="contained" onClick={onSubmitHendler}>
          {loading ? <CircularProgress size="20px" color="inherit" /> : "Войти"}
        </Button>
      </Box>
    </div>
  );
};

export default Login;
