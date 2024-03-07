import React from 'react';
import classes from "@components/Pagination/styles.module.scss";
import {joinClasses} from "@/utils/joinClasses.ts";

function EllipsisButton() {

  return (
     <button className={joinClasses([classes.btn_page, classes.disabled])}>
       ...
     </button>
  );
}

export default EllipsisButton;