import React, {useEffect, useRef, useState} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";


export type ItemStates = {
  active: number | string,
  focus: number | string,
}


interface CustomSelectProps {
  children?: React.ReactNode,
}

function Dropdown({ children }: CustomSelectProps) {
  const [show, setShow] = useState(false);
  const [itemStates, setItemStates] = useState<ItemStates>({ active: "", focus: "" });
  const dropdownRef = useRef<HTMLDivElement>(null);


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
    <DropdownContext.Provider value={{show, setShow, itemStates, setItemStates}}>
      <div ref={dropdownRef} className={classes.dropdown}>
          {children}
      </div>
    </DropdownContext.Provider>
  );
}

export default Dropdown;