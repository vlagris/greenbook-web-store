import React from 'react';
import classes from "./styles.module.scss";
import {clsx} from "clsx";



function Input({error = false, errorMessage = "", ...props}) {

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <input className={clsx(classes.input, error && classes.input_error)} autoComplete="off" {...props}/>
      </div>
      {errorMessage && error &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );

}

export default Input;

