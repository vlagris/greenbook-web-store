import React, {useEffect, useState} from "react";
import {useGetGenresQuery} from "@/services/api";
import Header from "@components/Header";
import Modal from "@components/UI/Modal";
import BurgerButton from "@components/BurgerMenu/BurgerButton.tsx";
import BurgerMenuList from "@components/BurgerMenu/BurgerMenuList.tsx";
import classes from "./styles.module.scss";



interface BurgerMenuProps {
  show?: boolean
}

function BurgerMenu({show: showProp}: BurgerMenuProps) {
  const {data: genres} = useGetGenresQuery();
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (showProp !== undefined) {
      setShow(showProp)
    }
  }, [showProp]);


  function handleClick(state: boolean) {
    return () => setShow(state);
  }


  return (
    <>
      <BurgerButton onClick={handleClick(!show)}/>

      <Modal
        className={classes.modal}
        onHide={handleClick(false)}
        show={show}
      >
        <div className={classes.header}>
          <Header/>
        </div>

        <div className={classes.menu}>
          <BurgerMenuList
            genres={genres}
            onClick={handleClick(false)}
          />
        </div>
      </Modal>
    </>
  );
}

export default BurgerMenu;

