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
  const {
    setShow,
    itemsState,
    setItemsState
  } = useContext(DropdownContext);


  useEffect(() => {
    if (active) {
      setItemsState(prev => (
        {...prev, active: id, focus: id }
      ));
    }
  }, [active]);


    function handleClick() {
      if (onClick) {
        onClick()
      }
      setShow(false);
      setItemsState(prev => (
        {...prev, active: id, focus: id }
      ));
  }

  function toggleItemFocus(id: number | string) {
    return () => setItemsState(prev => (
      { ...prev, focus: id }
    ));
  }


  return (
    <li
      className={clsx(classes.dropdown_item, itemsState.focus === id && classes.dropdown_item_active)}
      onClick={handleClick}
      onMouseEnter={toggleItemFocus(id)}
      onMouseLeave={toggleItemFocus(itemsState.type === "focus"? "" : itemsState.active)}
    >
      {children}
    </li>
  );
}

export default DropdownItem;