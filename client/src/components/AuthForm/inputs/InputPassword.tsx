import React, {useState} from 'react';
import {clsx} from "clsx";
import classes from "./styles.module.scss";
import EyeOn from "@assets/icons/eye-open.svg?react";
import EyeOff from "@assets/icons/eye-off.svg?react";


function InputPassword({error = false, errorMessage = "", ...props}) {
  const [show, setShow] = useState(false);

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <input
          className={clsx(classes.input, error && classes.input_error)}
          autoComplete="off"
          {...props}
          type={show ? "text" : "password"}
        />
        <button type="button" className={classes.btn} onClick={() => setShow(!show)} data-testid="toggleVisibility">
          {show ?
            <EyeOff className={classes.icon}/>
            :
            <EyeOn className={classes.icon}/>
          }
        </button>
      </div>
      {errorMessage && error &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );
}

export default InputPassword;