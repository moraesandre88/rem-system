import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faUser, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../assets/styles/Register.module.css";

const Register = () => {
  const {
    formState: { errors },
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
      <form className={styles.form} onSubmit={handleSubmit(submitData)}>
        {message ? (
          success ? (
            <p className={styles.success}>
              <FontAwesomeIcon className={styles.icon} icon={faCheck} />
              {message}
            </p>
          ) : (
            <p className={styles.error}>{message}</p>
          )
        ) : null}

        <label className={styles.label} htmlFor="username">
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          Usuário:
        </label>
        <input
          className={styles.input}
          {...register("username", {
            pattern: {
              value: /^[a-zA-Z]{8,15}$/,
              message: "Somente letras. De 8 à 15 caracteres",
            },
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
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,10}$).*/,
              message:
                "Letras, números e caracteres especiais. De 5 à 15 caracteres",
            },
            required: "Campo obrigatório",
          })}
          autoComplete="off"
          type="password"
        />
        <p className={styles.error}>{errors.password?.message}</p>

        <label className={styles.label} htmlFor="passwordConfirmation">
          <FontAwesomeIcon className={styles.icon} icon={faLock} />
          Confirme sua senha:
        </label>
        <input
          className={styles.input}
          {...register("passwordConfirmation", {
            required: "Campo obrigatório",
            validate: (value) =>
              value === passwordWatcher || "As senhas não coincidem",
          })}
          autoComplete="off"
          type="password"
        />
        <p className={styles.error}>{errors.passwordConfirmation?.message}</p>

        <div className={styles.button_wrapper}>
          <button className={styles.button} type="submit">
            Criar
          </button>
        </div>
      </form>

      <div className={styles.login_wrapper}>
        <p>
          Já é cadastrado?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
