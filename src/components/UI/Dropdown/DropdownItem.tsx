import React, {useContext, useEffect} from 'react';
import {clsx} from "clsx";
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";


interface DropdownItemProps {
  children?: React.ReactNode,
  id: number | string,
  active?: boolean,
  onClick?: () => void
}

function DropdownItem({ children, id, active, onClick }: DropdownItemProps) {
  const {setShow, itemStates, setItemStates} = useContext(DropdownContext);

  useEffect(() => {
    if (active) {
      setItemStates({ active: id, focus: id });
    }
  }, [active]);

    function handleClick() {
      setShow(false);
      setItemStates({ active: id, focus: id });
      if (onClick) {
        onClick()
      }
  }

  function handleMouse(id: number | string) {
      return () => {
        setItemStates(prev => ({ ...prev, focus: id }));
      }
  }

  return (
    <li
      className={clsx(classes.dropdown_item, itemStates.focus === id && classes.dropdown_item_active)}
      onClick={handleClick}
      onMouseEnter={handleMouse(id)}
      onMouseLeave={handleMouse(itemStates.active)}
    >
      {children}
    </li>
  );
}

export default DropdownItem;