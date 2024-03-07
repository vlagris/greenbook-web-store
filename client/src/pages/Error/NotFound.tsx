import React from 'react';
import classes from "./styles.module.scss";
import notFoundImg from "@assets/images/Illustration.png";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className={classes.wrap}>
      <img className={classes.img} src={notFoundImg} alt=""/>
      <h2 className={classes.title}>Упс! Страница не найдена</h2>
      <p className={classes.description}>Страница которую вы ищите больше не существует, либо вы ошиблись адресом. Попробуйте воспользоваться поиском.</p>
      <Link className="btn" to="/">Вернуться на главную</Link>
    </div>
  );
}

export default NotFound;
