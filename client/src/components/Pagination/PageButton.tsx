import React from 'react';
import classes from "@components/Pagination/styles.module.scss";
import {ItemProps} from "@components/Pagination/Item.tsx";



function PageButton({page, onClick}: ItemProps) {
  function handleClick (event: React.MouseEvent<HTMLElement>) {
    if(onClick && page) {
      onClick(event, page);
      window.scrollTo(0, 0);
    }
  }

  return (
    <button className={classes.btn_page} onClick={handleClick}>
      {page}
    </button>
  );
}

export default PageButton;