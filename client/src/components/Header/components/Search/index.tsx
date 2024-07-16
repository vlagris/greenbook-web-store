import SearchLogo from '@assets/icons/search.svg?react';
import classes from "./styles.module.scss";


function Index() {
  return (
    <div className={classes.search}>
      <div className={classes.input_wrap}>
        <SearchLogo className={classes.icon}/>
        <input className={classes.input} type="text" placeholder="Поиск"/>
      </div>
      <button className={classes.btn}>Поиск</button>
    </div>
  );
}

export default Index;