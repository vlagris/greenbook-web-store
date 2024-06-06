import React from "react";
import classes from "./styles.module.scss";



interface FilterItemProps {
  name: string,
  children: React.ReactNode,
}

function FiltersItemWrapper({name, children}: FilterItemProps) {
  return (
    <div className={classes.item}>
      <div className={classes.item_title}>
        {name}
      </div>
      {children}
    </div>
  );
}

export default FiltersItemWrapper;