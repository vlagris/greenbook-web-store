import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "@components/BurgerMenu/styles.module.scss";



interface BurgerMenuItemProps {
  to: string,
  name: string
  onClick: () => void,
}

function BurgerMenuItem({to, name, onClick}: BurgerMenuItemProps) {
  return (
    <li className={classes.item}>
      <NavLink
        to={to}
        className={classes.link}
        onClick={onClick}
      >
        <span className={classes.item_text}>
          {name}
        </span>
      </NavLink>
    </li>
  );
}

export default BurgerMenuItem;