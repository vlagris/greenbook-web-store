import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {ErrorType, HttpError} from "@/types";
import {formErrorMessage} from "@/constants.ts";
import {useLoginMutation} from "@/services/api";
import {Form, FormInput, FormInputPassword} from "@components/AuthForm";
import classes from "@pages/Login/styles.module.scss";
import {clsx} from "clsx";



type LoginFormValues = {
  email: string,
  pass: string
}

function Login() {
  const [login] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();


  async function onSubmit(data: LoginFormValues){
    try {
      await login({email: data.email, password: data.pass}).unwrap();
      const navigatePath = location.state?.from?.pathname ?? "/";
      navigate(navigatePath);
    } catch (err) {
      const {type} = err as HttpError;
      switch (type) {
        case ErrorType.INVALID_DATA:
          setError("root", {
            type: "custom",
            message: "Не верный логин или пароль"
          })
          setError("email", { type: "custom" })
          setError("pass", { type: "custom" })
          break;
        case ErrorType.SERVER_ERROR:
          setError("root", {
            type: "custom",
            message: "Техническая ошибка"
          });
          break;
      }
    }
  }


  return (
    <div className={classes.login}>
      <Form title="Войти" onSubmit={handleSubmit(onSubmit)}>

        {errors.root &&
          <p className={classes.global_error}>{errors.root.message}</p>
        }

        <div className={classes.fields}>
          <FormInput
            type="text"
            placeholder="Электронная почта"
            formRegister={register("email", {required: formErrorMessage.EMAIL_NONE})}
            errorMessage={errors.email?.message}
            isError={!!errors.email}
          />

          <FormInputPassword
            placeholder="Пароль"
            formRegister={register("pass", {required: formErrorMessage.PASSWORD_NONE})}
            errorMessage={errors.pass?.message}
            isError={!!errors.pass}
          />
        </div>

        <div className={classes.settings}>
          {/*<FormCheckbox>Запомнить меня</FormCheckbox>*/}
          <Link to="/" className={classes.text}>
            Забыли пароль?
          </Link>
        </div>

        <button
          type="submit"
          className={clsx("btn", "btn-fill", classes.btn)}
        >
          Войти
        </button>

        <div className={classes.redirect}>
        <span className={classes.text}>
          Нет аккаунта?
        </span>
          <Link to="/signup" className={classes.link}>
            Зарегистрироваться
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;