import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import useGlobal from "../../modules/hooks/useGlobal";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styles from "../../assets/styles/Login.module.css";

const Login = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });
  const { setAuth, setRoles } = useGlobal();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const destiny = location.state?.from?.pathname || "/";

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  const submitData = async (data) => {
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3500/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await response?.json();
      if (!response?.ok) {
        if ([400, 401, 500].includes(response?.status)) {
          setErrorMessage(responseData.message);
        }
      } else {
        const accessToken = responseData?.accessToken;
        const decodedToken = jwt_decode(accessToken);
        const roles = decodedToken?.userInfo?.userRoles;
        const rolesList = decodedToken?.serverInfo?.serverRolesList;
        setAuth({
          username: data.username,
          password: data.password,
          roles,
          accessToken,
        });
        setRoles(rolesList);
        reset();
        navigate(destiny, { replace: true });
      }
    } catch (error) {
      setErrorMessage("Falha no login.");
    }
  };

  return (
    <Paper className={styles.paper} elevation={3} variant="elevation">
      <form onSubmit={handleSubmit(submitData)}>
        {/*Errors from the submit response */}
        <Typography paragraph={true} gutterBottom={true} color="error.main">
          {errorMessage}
        </Typography>

        {/*Username field */}
        <TextField
          {...register("username", {
            required: "Campo obrigatório",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          label="Usuário"
          autoFocus={true}
          autoComplete="off"
        />
        <Typography paragraph={true} gutterBottom={true} color="error.main">
          {errors.username?.message}
        </Typography>

        {/*Password field */}
        <TextField
          {...register("password", {
            required: "Campo obrigatório",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          label="Senha"
          type="password"
          autoComplete="off"
        />
        <Typography paragraph={true} gutterBottom={true} color="error.main">
          {errors.password?.message}
        </Typography>

        <Stack direction="row" justifyContent="center">
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
          >
            Login
          </Button>
        </Stack>
      </form>

      <Typography
        paragraph={true}
        gutterBottom={true}
        mt={1}
        color="primary.main"
      >
        Não é cadastrado? <Link to="/register">Cadastre-se</Link>
      </Typography>
    </Paper>
  );
};

export default Login;
