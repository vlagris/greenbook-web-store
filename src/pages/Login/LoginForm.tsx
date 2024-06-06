import React from 'react';
import { Link } from "react-router-dom";
import { formErrorMessage } from "@/constants.ts";
import {FormField} from "@/hooks/useFormField.ts";
import { Form, FormButton, FormCheckbox, FormInput, FormInputPassword } from "@components/AuthForm";
import classes from "@pages/Login/styles.module.scss";



interface LoginFormProps {
  emailField: FormField,
  passField: FormField,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

function LoginForm({emailField, passField, onSubmit}: LoginFormProps) {

  return (
    <Form title="Войти" onSubmit={onSubmit}>

      <div className={classes.input_wrap}>
        <FormInput
          type="text"
          placeholder="Электронная почта"
          value={emailField.value}
          onChange={emailField.onChange}
          onBlur={emailField.onBlur}
          error={emailField.error}
          errorMessage={formErrorMessage.EMAIL_NONE}
        />
      </div>
      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль"
          value={passField.value}
          onChange={passField.onChange}
          onBlur={passField.onBlur}
          error={passField.error}
          errorMessage={formErrorMessage.PASSWORD_NONE}
        />
      </div>

      <div className={classes.settings}>
        <FormCheckbox>
          Запомнить меня
        </FormCheckbox>
        <Link to="/" className={classes.text}>
          Забыли пароль?
        </Link>
      </div>

      <FormButton>
        Войти
      </FormButton>

      <div className={classes.redirect}>
        <span className={classes.text}>
          Нет аккаунта?
        </span>
        <Link to="/signup" className={classes.link}>
          Зарегистрироваться
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
