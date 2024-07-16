import React from 'react';
import classes from "./styles.module.scss";
import BurgerMenuIcon from "@/assets/icons/burger-menu.svg?react";



function BurgerButton({onClick}: {onClick: () => void}) {
  return (
    <button className={classes.button} onClick={onClick} data-testid="BurgerButton">
      <BurgerMenuIcon className={classes.button_icon}/>
    </button>
  );
}

export default BurgerButton;