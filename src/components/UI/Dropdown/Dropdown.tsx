import React, {useEffect, useRef, useState} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";


export type ItemStates = {
  active: number | string,
  focus: number | string,
  type: "focus" | "active"
}


interface CustomSelectProps {
  children?: React.ReactNode,
  itemEffect?: "focus" | "active"
}

function Dropdown({ children, itemEffect = "active" }: CustomSelectProps) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [itemsState, setItemsState] = useState<ItemStates>({
    active: "",
    focus: "",
    type: itemEffect
  });


  useEffect(() => {
    if (!show) {
      return;
    }

    function handleWindowClick(event: MouseEvent) {
      const eventTarget = event.target as Element
      if (!dropdownRef.current) {
        return
      }
      if (!dropdownRef.current.outerHTML.includes(eventTarget.outerHTML)) {
        setShow(false);
      }
    }

    window.addEventListener("click", handleWindowClick, {capture: true});
    return () => window.removeEventListener("click", handleWindowClick);
  }, [show]);


  return (
    <DropdownContext.Provider value={{show, setShow, itemsState, setItemsState}}>
      <div ref={dropdownRef} className={classes.dropdown}>
          {children}
      </div>
    </DropdownContext.Provider>
  );
}

export default Dropdown;