import React from "react";
import classes from "./styles.module.scss";


function List({children}: {children: React.ReactNode}) {
  return (
    <div className={classes.list}>
      { children }
    </div>
  );
}


export default List;