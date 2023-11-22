import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import useGlobal from "../../modules/hooks/useGlobal";
import { useForm } from "react-hook-form";
import styles from "../../assets/styles/Login.module.css";

const Login = () => {
  const {
    formState: { errors },
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
    try {
      const response = await fetch("http://localhost:3500/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response?.ok) {
        const responseData = await response?.json();
        if ([400, 401, 500].includes(response?.status)) {
          setErrorMessage(responseData.message);
        }
      } else {
        const responseData = await response?.json();
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
      if (error instanceof TypeError) {
        setErrorMessage("Falha na rede.");
      } else {
        setErrorMessage("Falha no login.");
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(submitData)}>
        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

        <label className={styles.label} htmlFor="username">
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          Usuário:
        </label>
        <input
          className={styles.input}
          {...register("username", {
            required: "Campo obrigatório",
          })}
          autoComplete="off"
          type="text"
        />
        <p className={styles.error}>{errors.username?.message}</p>

        <label className={styles.label} htmlFor="password">
          <FontAwesomeIcon className={styles.icon} icon={faLock} />
          Senha:
        </label>
        <input
          className={styles.input}
          {...register("password", {
            required: "Campo obrigatório",
          })}
          autoComplete="off"
          type="password"
        />
        <p className={styles.error}>{errors.password?.message}</p>

        <div className={styles.button_wrapper}>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>

      <div className={styles.register_wrapper}>
        <p>
          Não se cadastrou?
          <span>
            <Link to="/register">Cadastre-se</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
