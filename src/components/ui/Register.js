import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styles from "../../assets/styles/Register.module.css";

const Register = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: { username: "", password: "", passwordConfirmation: "" },
    mode: "onTouched",
  });
  const passwordWatcher = watch("password");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      if (success) {
        setSuccess(false);
      }
    }, 3000);
  }, [message, success]);

  const submitData = async (data) => {
    try {
      const response = await fetch("http://localhost:3500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const responseData = await response?.json();
      if (!response?.ok) {
        setSuccess(false);
        if ([400, 409, 500].includes(response?.status)) {
          setMessage(responseData.message);
        }
      } else {
        reset();
        setSuccess(true);
        setMessage(responseData.message);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setMessage("Falha na rede.");
      } else {
        setMessage("Falha na criação do usuário.");
      }
    }
  };

  return (
    <>
      <Paper className={styles.paper} elevation={3} variant="elevation">
        <form onSubmit={handleSubmit(submitData)}>
          {/*Messages from the submit response */}
          <Typography
            paragraph={true}
            gutterBottom={true}
            color={success ? "success.main" : "error.main"}
          >
            {message}
          </Typography>

          {/*Username field */}
          <TextField
            {...register("username", {
              pattern: {
                value: /^[a-zA-Z]{8,15}$/,
                message: "Somente letras. De 8 à 15 caracteres",
              },
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
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,10}$).*/,
                message:
                  "Letras, números e caracteres especiais. De 5 à 15 caracteres",
              },
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

          {/*Password confirmation field */}
          <TextField
            {...register("passwordConfirmation", {
              required: "Campo obrigatório",
              validate: (value) =>
                value === passwordWatcher || "As senhas não coincidem",
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
            label="Confirme sua senha"
            type="password"
            autoComplete="off"
          />
          <Typography paragraph={true} gutterBottom={true} color="error.main">
            {errors.passwordConfirmation?.message}
          </Typography>

          <Stack direction="row" justifyContent="center">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              Cadastrar
            </Button>
          </Stack>
        </form>

        <Typography
          paragraph={true}
          gutterBottom={true}
          mt={1}
          color="primary.main"
        >
          Já é cadastrado? <Link to="/login">Faça login</Link>
        </Typography>
      </Paper>
    </>
  );
};

export default Register;
