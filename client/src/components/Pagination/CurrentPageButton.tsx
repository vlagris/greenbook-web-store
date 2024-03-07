import React from 'react';
import classes from "@components/Pagination/styles.module.scss";
import {ItemProps} from "@components/Pagination/Item.tsx";
import {joinClasses} from "@/utils/joinClasses.ts";

function CurrentPageButton({page}: ItemProps) {

  return (
    <button className={joinClasses([classes.btn_page, classes.active])}>
      {page}
    </button>
  );
}

export default CurrentPageButton;