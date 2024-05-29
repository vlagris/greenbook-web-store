import React from 'react';
import {clsx} from "clsx";
import CustomInput from "@components/UI/CustomInput";
import classes from "./styles.module.scss";



function Input({error = false, errorMessage = "", ...props}) {

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <CustomInput
          {...props}
          status={error ? "error" : "default"}
        />
      </div>
      {errorMessage && error &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );

}

export default Input;

