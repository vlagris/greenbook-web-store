import React from 'react';
import {clsx} from "clsx";
import classes from "@components/Pagination/styles.module.scss";


function EllipsisButton() {

  return (
     <button className={clsx(classes.btn_page, classes.disabled)}>
       ...
     </button>
  );
}

export default EllipsisButton;