import React, {useContext} from 'react';
// @ts-ignore
import ArrowIcon from "@assets/icons/arrow-right.svg?react"
import {ItemContext} from "@components/UI/Accordion/ItemContext.ts";
import classes from "./styles.module.scss";

function Icon() {
  const {show} = useContext(ItemContext);


  return (
    <div>
      <ArrowIcon className={`${classes.btn_icon} ${show && classes.btn_icon_active}`}/>
    </div>
  );
}

export default Icon;