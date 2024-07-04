import React, {useState} from 'react';
import CustomInput from "@components/UI/CustomInput";
import classes from "./styles.module.scss";
import EyeOn from "@assets/icons/eye-open.svg?react";
import EyeOff from "@assets/icons/eye-off.svg?react";


function InputPassword({isError = false, errorMessage = "", ...props}) {
  const [show, setShow] = useState(false);

  return (
    <div className={classes.wrap}>
      <div className={classes.input_wrap}>
        <CustomInput
          {...props}
          status={isError ? "error" : "default"}
          type={show ? "text" : "password"}
        />
        <div className={classes.btn} onClick={() => setShow(!show)} data-testid="toggleVisibility">
          {show ?
            <EyeOff className={classes.icon}/>
            :
            <EyeOn className={classes.icon}/>
          }
        </div>
      </div>
      {errorMessage && isError &&
        <p className={classes.error_description}>{errorMessage}</p>
      }
    </div>
  );
}

export default InputPassword;