import React, {useContext} from 'react';
import {clsx} from "clsx";
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";


interface DropdownButtonProps {
  children: React.ReactNode,
  className?: string
}

function DropdownButton({ children }: DropdownButtonProps) {
  const {showDesktop, showMobile } = useContext(DropdownContext);
  const show = showDesktop || showMobile;

  return (
    <div
      className={clsx(classes.dropdown_btn, show && classes.dropdown_btn_active)}
    >
      { children }
    </div>
  );
}

export default DropdownButton;


