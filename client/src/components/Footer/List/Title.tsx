import React from "react";
import classes from "./styles.module.scss";

function Title({children}: {children: React.ReactNode}) {

  return (
    <h4 className={classes.title}>
      { children }
    </h4>
  );
}


export default Title;