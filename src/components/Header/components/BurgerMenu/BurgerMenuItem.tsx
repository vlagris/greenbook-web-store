import React from 'react';
import classes from "@components/Header/components/BurgerMenu/styles.module.scss";
import {NavLink} from "react-router-dom";



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