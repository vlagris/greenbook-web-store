import React from 'react';
import {clsx} from "clsx";
import classes from "@components/Pagination/styles.module.scss";
import {ItemProps} from "@components/Pagination/Item.tsx";


function CurrentPageButton({page}: ItemProps) {

  return (
    <button className={clsx(classes.btn_page, classes.active)}>
      {page}
    </button>
  );
}

export default CurrentPageButton;