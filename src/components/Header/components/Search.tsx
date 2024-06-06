import SearchLogo from '@assets/icons/search.svg?react';
import classes from "../styles.module.scss";


function Search() {
  return (
    <div className={classes.search}>
      <div className={classes.search_input_wrap}>
        <SearchLogo className={classes.search_icon}/>
        <input className={classes.search_input} type="text" placeholder="Поиск"/>
      </div>
      <button className={classes.search_btn}>Поиск</button>
    </div>
  );
}

export default Search;