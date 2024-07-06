import React from 'react';
import {clsx} from "clsx";
import classes from "./styles.module.scss";


function Button({children, ...props}: {children: React.ReactNode}) {

  return (
    <button
      type="submit"
      role="submit"
      className={clsx("btn", "btn-fill" , classes.btn)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;