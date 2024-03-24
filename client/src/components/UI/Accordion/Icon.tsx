import React, {useContext} from 'react';
import {clsx} from "clsx";
import {ItemContext} from "@components/UI/Accordion/ItemContext.ts";
import ArrowIcon from "@assets/icons/arrow-right.svg?react"
import classes from "./styles.module.scss";


function Icon() {
  const {show} = useContext(ItemContext);


  return (
    <div>
      <ArrowIcon className={clsx(classes.btn_icon, show && classes.btn_icon_active)}/>
    </div>
  );
}

export default Icon;