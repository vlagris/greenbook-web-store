import HeaderTop from "@components/Header/components/HeaderTop.tsx";
import HeaderBottom from "@components/Header/components/HeaderBottom.tsx";
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