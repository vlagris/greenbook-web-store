import React from 'react';
import {clsx} from "clsx";
import {ItemProps, PaginationItemTypes} from "@components/Pagination/Item.tsx";
import classes from "@components/Pagination/styles.module.scss";

import ArrowIcon from "@assets/icons/arrow-right.svg?react";


function ArrowButton({type, page, onClick}: ItemProps) {
  let arrowIconClass = clsx(classes.arrow, type === PaginationItemTypes.prev && classes.arrow_left);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (onClick && page) {
      onClick(event, page);
      window.scrollTo(0, 0);
    }
  }

  return (
    <>
      {onClick?
        <button className={classes.btn_arrow} onClick={handleClick}>
          <ArrowIcon className={arrowIconClass}/>
        </button>
        :
        <button className={clsx(classes.btn_arrow, classes.disabled)}>
          <ArrowIcon className={arrowIconClass}/>
        </button>
      }
    </>
  );
}

export default ArrowButton;