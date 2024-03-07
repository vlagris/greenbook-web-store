import React from 'react';
import {ItemProps, PaginationItemTypes} from "@components/Pagination/Item.tsx";
import classes from "@components/Pagination/styles.module.scss";
import {joinClasses} from "@/utils/joinClasses.ts";
// @ts-ignore
import ArrowIcon from "@assets/icons/arrow-right.svg?react";


function ArrowButton({type, onClick}: ItemProps) {
  let arrowIconClass = classes.arrow;

  if (type === PaginationItemTypes.prev) {
    arrowIconClass = joinClasses([classes.arrow, classes.arrow_left])
  }

  return (
    <>
      {onClick?
        <button className={classes.btn_arrow} onClick={onClick}>
          <ArrowIcon className={arrowIconClass}/>
        </button>
        :
        <button className={joinClasses([classes.btn_arrow, classes.disabled])}>
          <ArrowIcon className={arrowIconClass}/>
        </button>
      }
    </>
  );
}

export default ArrowButton;