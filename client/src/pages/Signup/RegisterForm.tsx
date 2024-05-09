import React from 'react';
import {Link} from "react-router-dom";
import {formErrorMessage} from "@/constants.ts";
import {FormField} from "@/hooks/useFormField.ts";
import {Form, FormButton, FormCheckbox, FormInput, FormInputPassword} from "@components/AuthForm";
import classes from "@pages/Signup/styles.module.scss";



interface RegisterFormProps {
  emailField: FormField,
  passField: FormField,
  confirmPassField: FormField,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

function RegisterForm({emailField, passField, confirmPassField, onSubmit}: RegisterFormProps) {


  return (
    <Form title="Зарегистрироваться" onSubmit={onSubmit}>

      <div className={classes.input_wrap}>
        <FormInput
          type="text"
          placeholder="Электронная почта"
          value={emailField.value}
          onChange={emailField.onChange}
          onBlur={emailField.onBlur}
          error={emailField.error}
          errorMessage={formErrorMessage.EMAIL_INVALID}
        />
      </div>

      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль"
          value={passField.value}
          onChange={passField.onChange}
          onBlur={passField.onBlur}
          error={passField.error}
          errorMessage={formErrorMessage.PASSWORD_INVALID}
        />
      </div>

      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль еще раз"
          value={confirmPassField.value}
          onChange={confirmPassField.onChange}
          onBlur={confirmPassField.onBlur}
          error={confirmPassField.error}
          errorMessage={formErrorMessage.CONFIRM_PASSWORD_INVALID}
        />
      </div>

      <div className={classes.settings}>
        <FormCheckbox>
          Принять все условия
        </FormCheckbox>
      </div>

      <FormButton>
        Зарегистрироваться
      </FormButton>

      <div className={classes.login}>
        <span className={classes.text}>
          Уже есть аккаунт
        </span>
        <Link to="/login" className={classes.link}>
          Войти
        </Link>
      </div>
    </Form>
  );
}

export default RegisterForm;
