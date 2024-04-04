import React from 'react';
import {Form, FormButton, FormCheckbox, FormInput, FormInputPassword} from "@components/AuthForm";
import {Link, useNavigate} from "react-router-dom";
import UseFormField from "@/hooks/useFormField.ts";
import validator from "validator";
import {ErrorType, HttpError} from "@/types.ts";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {register} from "@/store/auth";
import {formErrorMessage} from "@/constants.ts";
import classes from "@pages/Signup/styles.module.scss";

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = UseFormField({
    required: true,
    validate: (state: string) => validator.isEmail(state)
  });
  const pass = UseFormField({
    required: true,
    validate: (state: string) => validator.isLength(state, {min: 8})
  });
  const confirmPass = UseFormField({
    required: true,
    validate: (state: string) => state === pass.value
  });


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidEmail = email.isValid();
    const isValidPass = pass.isValid();
    const isValidConfirmPass = confirmPass.isValid();
    if (!isValidEmail || !isValidPass || !isValidConfirmPass) {
      return;
    }

    try {
      await dispatch(register({email: email.value, password: pass.value})).unwrap();
      navigate("/");
    } catch (err) {
      const {type} = err as HttpError;
      switch (type) {
        case ErrorType.BAD_REQUEST:
        case ErrorType.INVALID_DATA:
        case ErrorType.NOT_VALIDATION:
        case ErrorType.EMAIL_BUSY:
          email.setError(true);
          pass.setError(true);
          break;
        case ErrorType.SERVER_ERROR:
          break;
      }
    }
  }

  return (
    <Form title="Зарегистрироваться" onSubmit={handleSubmit}>

      <div className={classes.input_wrap}>
        <FormInput
          type="text"
          placeholder="Электронная почта"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          error={email.error}
          errorMessage={formErrorMessage.EMAIL_INVALID}
        />
      </div>

      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль"
          value={pass.value}
          onChange={pass.onChange}
          onBlur={pass.onBlur}
          error={pass.error}
          errorMessage={formErrorMessage.PASSWORD_INVALID}
        />
      </div>

      <div className={classes.input_wrap}>
        <FormInputPassword
          placeholder="Пароль еще раз"
          value={confirmPass.value}
          onChange={confirmPass.onChange}
          onBlur={confirmPass.onBlur}
          error={confirmPass.error}
          errorMessage={formErrorMessage.CONFIRM_PASSWORD_INVALID}
        />
      </div>

      <div className={classes.settings}>
        <FormCheckbox>Принять все условия</FormCheckbox>
      </div>

      <FormButton>Зарегистрироваться</FormButton>

      <div className={classes.login}>
        <span className={classes.text}>Уже есть аккаунт</span>
        <Link to="/login" className={classes.link}>Войти</Link>
      </div>
    </Form>
  );
}

export default RegisterForm;
