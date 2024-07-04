import React from 'react';
import {clsx} from "clsx";
import classes from "./styles.module.scss";


interface CustomInputProps {
  size?: "small" | "default",
  status?: "default" | "error",
  formRegister?: any,

  className?: string,
  type?: string,
  name?: string,
  placeholder?: string,
  value?: string | number | readonly string[],
  onChange?:  React.ChangeEventHandler<HTMLInputElement>,
  onBlur?:  React.FocusEventHandler<HTMLInputElement>
}

function CustomInput({ className, size = "default", status = "default", formRegister, ...otherProps }: CustomInputProps) {

  return (
    <input
      className={clsx(
        classes.input,
        size === "small" && classes.input_small,
        status === "error" && classes.error,
        className
      )}
      autoComplete="off"
      {...otherProps}
      {...formRegister}
    />

  );
}

export default CustomInput;