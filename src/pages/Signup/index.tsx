import React from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {ErrorType, HttpError} from "@/types.ts";
import {register} from "@/store/auth";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import UseFormField from "@/hooks/useFormField.ts";
import RegisterForm from "@pages/Signup/RegisterForm.tsx";
import classes from "@pages/Signup/styles.module.scss";



function Signup() {
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


  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <main>
      <div className={classes.signup}>
        <RegisterForm
          emailField={email}
          passField={pass}
          confirmPassField={confirmPass}
          onSubmit={onSubmit}
        />
      </div>
    </main>
  );
}

export default Signup;