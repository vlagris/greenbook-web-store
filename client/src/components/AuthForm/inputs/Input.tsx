import React from 'react';
import classes from "@components/AuthForm/inputs/styles.module.scss";
import {joinClasses} from "@/utils/joinClasses.ts";



function Input({error = false, errorMessage = "", ...props}) {
  const className = error? joinClasses([classes.input, classes.input_error]) : classes.input;

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <input className={className} autoComplete="off" {...props}/>
      </div>
      {errorMessage && error &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );

}

export default Input;

