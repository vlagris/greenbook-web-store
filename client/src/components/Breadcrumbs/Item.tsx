import React from "react";
import {Link} from "react-router-dom";
import classes from "@components/Breadcrumbs/styles.module.scss";
// @ts-ignore
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