import HeaderTop from "@components/Header/HeaderTop";
import HeaderBottom from "@components/Header/HeaderBottom";
import classes from "./styles.module.scss";

function Header() {

  return (
    <header className={classes.header}>
      <HeaderTop/>
      <HeaderBottom/>
    </header>
  );
}

export default Header;