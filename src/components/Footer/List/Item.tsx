import React from "react";
import {Link} from "react-router-dom";
import classes from "./styles.module.scss";

function Item({children}: {children: React.ReactNode}) {

  return (
    <div className={classes.item}>
      <Link to="/" className={classes.link}>
        {children}
      </Link>
    </div>
  );
}

export default Item;