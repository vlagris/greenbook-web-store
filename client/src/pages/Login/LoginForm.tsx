import React from 'react';
import {Form, FormButton, FormCheckbox, FormInput, FormInputPassword} from "@components/AuthForm";
import classes from "@pages/Login/styles.module.scss";
import {Link, useNavigate} from "react-router-dom";
import UseFormField from "@/hooks/useFormField.ts";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {ErrorType, HttpError} from "@/types.ts";
import {login} from "@/store/userData/userData.slice";
import {formErrorMessage} from "@/constants.ts";


function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = UseFormField({ required: true });
  const pass = UseFormField({ required: true });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidEmail = email.isValid();
    const isValidPass = pass.isValid();
    if (!isValidEmail || !isValidPass) {
      return;
    }

    try {
      await dispatch(login({email: email.value, password: pass.value})).unwrap();
      navigate("/");
    } catch (err) {
      const {type} = err as HttpError;
      switch (type) {
        case ErrorType.BAD_REQUEST:
        case ErrorType.INVALID_DATA:
        case ErrorType.NOT_VALIDATION:
          email.setError(true);
          pass.setError(true);
          break;
        case ErrorType.SERVER_ERROR:
          break;
      }
    }
  }


  return (
    <Form title="Войти" onSubmit={handleSubmit}>

      <div className={classes.input_wrap}>
        <FormInput
          type="text"
          placeholder="Электронная почта"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          error={email.error}
          errorMessage={formErrorMessage.EMAIL_NONE}
        />
      </div>
      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль"
          value={pass.value}
          onChange={pass.onChange}
          onBlur={pass.onBlur}
          error={pass.error}
          errorMessage={formErrorMessage.PASSWORD_NONE}
        />
      </div>

      <div className={classes.settings}>
        <FormCheckbox>Запомнить меня</FormCheckbox>
        <Link to="/" className={classes.text}>Забыли пароль?</Link>
      </div>

      <FormButton>Войти</FormButton>

      <div className={classes.redirect}>
        <span className={classes.text}>Нет аккаунта?</span>
        <Link to="/signup" className={classes.link}>Зарегистрироваться</Link>
      </div>
    </Form>
  );
}

export default LoginForm;
