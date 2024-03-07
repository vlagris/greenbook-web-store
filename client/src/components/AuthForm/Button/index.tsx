import React from 'react';
import classes from "@components/AuthForm/Button/styles.module.scss";
import {joinClasses} from "@/utils/joinClasses.ts";

function Button({children, ...props}: {children: React.ReactNode}) {

  return (
    <button
      type="submit"
      className={joinClasses(["btn",classes.btn])}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;