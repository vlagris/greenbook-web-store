import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {clsx} from "clsx";
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import Portal from "@components/UI/Portal";
import classes from "@components/UI/Dropdown/styles.module.scss";



interface DropdownMenuDesktopProps {
  children?: React.ReactNode,
}

function DropdownMenuDesktop({ children }: DropdownMenuDesktopProps) {
  const {
    showDesktop,
    dropdownElements,
    setDropdownElements
  } = useContext(DropdownContext);
  const [menuStyle, setMenuStyle] = useState({});
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const menuElement = menuRef.current;
    if (menuElement) {
      setDropdownElements(prev => ({
        ...prev,
        menu: menuElement
      }))
    }
  }, [menuRef]);


  useLayoutEffect(() => {
    if (!menuRef.current || !showDesktop || !dropdownElements.toggle) {
      return
    }
    const menuRect = menuRef.current.getBoundingClientRect();
    const toggleRect = dropdownElements.toggle.getBoundingClientRect();
    if (toggleRect.left + toggleRect.width / 2 < window.innerWidth / 2) {
      setMenuStyle({
        top: toggleRect.bottom + 8,
        left: toggleRect.left
      });
    } else {
      setMenuStyle({
        top: toggleRect.bottom + 8,
        left: toggleRect.right - menuRect.width
      });
    }
  }, [showDesktop]);


  return (
    <Portal>
      <div className={classes.dropdown_desktop_menu_wrap}>
        <div
          ref={menuRef}
          className={clsx(classes.dropdown_menu, classes.dropdown_desktop_menu, showDesktop && classes.dropdown_menu_show)}
          style={menuStyle}
        >
          <ul className={classes.dropdown_list}>
            {children}
          </ul>
        </div>
      </div>
    </Portal>
  );
}

export default DropdownMenuDesktop;