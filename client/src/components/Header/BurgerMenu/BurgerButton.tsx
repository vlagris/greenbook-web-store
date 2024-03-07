import React from 'react';
import classes from "@components/Header/BurgerMenu/styles.module.scss";

function BurgerButton({onClick}: {onClick: () => void}) {
  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.button_line}/>
      <span className={classes.button_line}/>
      <span className={classes.button_line}/>
    </button>
  );
}

export default BurgerButton;