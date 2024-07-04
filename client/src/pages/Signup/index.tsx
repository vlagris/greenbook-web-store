import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {ErrorType, HttpError} from "@/types";
import { formErrorMessage } from "@/constants.ts";
import { useAddToCartMutation, useRegisterMutation } from "@/services/api";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { cartSelectors } from "@/store";
import { Form, FormButton, FormCheckbox, FormInput, FormInputPassword } from "@components/AuthForm";
import classes from "@pages/Signup/styles.module.scss";



type SignupFormValues = {
  email: string,
  pass: string,
  confirmPass: string
}

function Signup() {
  const [registration] = useRegisterMutation();
  const [addToCart] = useAddToCartMutation();
  const cart = useAppSelector(cartSelectors.cart);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>()


  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      await registration({email: data.email, password: data.pass}).unwrap();
      await addToCart(cart.items).unwrap();
      navigate("/");
    } catch (err) {
      const {type} = err as HttpError;
      switch (type) {
        case ErrorType.EMAIL_BUSY:
          setError("email", {
            type: "custom" ,
            message: formErrorMessage.EMAIL_BUSY
          });
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


  const emailOption = {
    required: formErrorMessage.EMAIL_NONE,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: formErrorMessage.EMAIL_INVALID
    }
  };

  const passOption = {
    required: formErrorMessage.PASSWORD_NONE,
    minLength: {
      value: 8,
      message: formErrorMessage.PASSWORD_MIN
    }
  };

  const confirmPassOption = {
    required: formErrorMessage.PASSWORD_NONE,
    validate: (value: string) => watch("pass") === value || formErrorMessage.CONFIRM_PASSWORD_INVALID
  };


  return (
    <div className={classes.signup}>
      <Form title="Зарегистрироваться" onSubmit={handleSubmit(onSubmit)}>

        {errors.root &&
          <p className={classes.global_error}>{errors.root.message}</p>
        }

        <div className={classes.input_wrap}>
          <FormInput
            type="text"
            placeholder="Электронная почта"
            formRegister={register("email", emailOption)}
            errorMessage={errors.email?.message}
          />
        </div>

        <div className={classes.input_wrap}>
          <FormInputPassword
            placeholder="Пароль"
            formRegister={register("pass", passOption)}
            errorMessage={errors.pass?.message}
          />
        </div>

        <div className={classes.input_wrap}>
          <FormInputPassword
            placeholder="Пароль еще раз"
            formRegister={register("confirmPass", confirmPassOption)}
            errorMessage={errors.confirmPass?.message}
          />
        </div>

        <div className={classes.settings}>
          <FormCheckbox>Принять все условия</FormCheckbox>
        </div>

        <FormButton>Зарегистрироваться</FormButton>

        <div className={classes.login}>
            <span className={classes.text}>
              Уже есть аккаунт
            </span>
          <Link to="/login" className={classes.link}>
            Войти
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Signup;