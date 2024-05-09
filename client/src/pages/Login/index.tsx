import React from "react";
import {useNavigate} from "react-router-dom";
import {ErrorType, HttpError} from "@/types.ts";
import {login} from "@/store/auth";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import UseFormField from "@/hooks/useFormField.ts";
import LoginForm from "@pages/Login/LoginForm.tsx";
import classes from "@pages/Login/styles.module.scss";



function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = UseFormField({ required: true });
  const pass = UseFormField({ required: true });


  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <main>
      <div className={classes.login}>
        <LoginForm
          emailField={email}
          passField={pass}
          onSubmit={onSubmit}
        />
      </div>
    </main>
  );
}

export default Login;