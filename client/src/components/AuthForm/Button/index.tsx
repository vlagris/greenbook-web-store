import React from 'react';
import {clsx} from "clsx";
import classes from "./styles.module.scss";


function Button({children, ...props}: {children: React.ReactNode}) {

  return (
    <button
      type="submit"
      className={clsx("btn", classes.btn)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;