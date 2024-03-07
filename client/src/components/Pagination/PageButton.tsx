import React from 'react';
import classes from "@components/Pagination/styles.module.scss";
import {ItemProps} from "@components/Pagination/Item.tsx";

function PageButton({page, onClick}: ItemProps) {
  function handleClick () {
    if(onClick) {
      onClick()
    }
  }

  return (
    <button className={classes.btn_page} onClick={handleClick}>
      {page}
    </button>
  );
}

export default PageButton;