import React from 'react';
import CustomInput from "@components/UI/CustomInput";
import classes from "./styles.module.scss";



function Input({errorMessage = "", isError = false, ...otherProps}) {

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <CustomInput
          {...otherProps}
          status={isError ? "error" : "default"}
        />
      </div>
      {errorMessage &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );

}

export default Input;

