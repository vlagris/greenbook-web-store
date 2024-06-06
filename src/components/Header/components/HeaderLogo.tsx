import React from 'react';
import {Link} from "react-router-dom";
import classes from "@components/Header/styles.module.scss";

function HeaderLogo() {
  return (
    <Link to="/" className={classes.logo}>
      <p className={classes.logo_title}>
        Green
        <span>Book</span>
      </p>
    </Link>
)
  ;
}

export default HeaderLogo;