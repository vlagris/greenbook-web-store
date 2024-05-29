import React from 'react';
import classes from "@pages/Catalog/styles.module.scss";



interface TotalCountProps {
  children?: React.ReactNode
}

function TotalCount({children}: TotalCountProps) {
  return (
    <span className={classes.total_count}>
      {children}
    </span>
  );
}

export default TotalCount;