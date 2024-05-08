import React, {useState} from 'react';
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


  return (
    <DropdownContext.Provider value={{show, setShow, itemStates, setItemStates}}>
      <div className={classes.dropdown}>
          {children}
      </div>
    </DropdownContext.Provider>
  );
}

export default Dropdown;