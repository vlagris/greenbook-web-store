import React from "react";
import {Link} from "react-router-dom";
import classes from "./styles.module.scss";
import ArrowBottom from "@assets/icons/arrow-right.svg?react";



interface ItemProps {
  to: string,
  crumbName: string
}

function Item({to, crumbName}: ItemProps) {


  return (
    <li className={classes.item}>
      <Link to={to} className={classes.page_link}>
        {crumbName}
      </Link>
      <ArrowBottom className={classes.arrow_icon}/>
    </li>
  );
}

export default Item;