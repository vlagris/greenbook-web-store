import React from 'react';
import classes from "@components/UI/Dropdown/styles.module.scss";
import ArrowBottom from "@assets/icons/arrow-right.svg?react";

function DropdownIcon() {
  return (
    <ArrowBottom className={classes.arrow_icon}/>
  );
}

export default DropdownIcon;