import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
import {clsx} from "clsx";
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";


interface DropdownMenuProps {
  children?: React.ReactNode,
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const {show} = useContext(DropdownContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [classPos, setClassPos] = useState("");


  useLayoutEffect(() => {
    if (!menuRef.current || !show) {
      return
    }
    const rect = menuRef.current.getBoundingClientRect();

    if (rect.x + rect.width < window.innerWidth / 2) {
      setClassPos(classes.dropdown_menu_left);
    } else {
      setClassPos(classes.dropdown_menu_right);
    }
  }, [show]);


  return (
    <div ref={menuRef} className={clsx(classes.dropdown_menu, classPos, show && classes.dropdown_menu_show)}>
      <ul className={classes.dropdown_list}>
        {children}
      </ul>
    </div>
  );
}

export default DropdownMenu;