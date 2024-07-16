import React, {useEffect, useState} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";



export type ItemStates = {
  active: number | string,
  focus: number | string,
  type: "focus" | "active",
}

export type DropdownElements = {
  toggle: HTMLButtonElement | null,
  menu: HTMLDivElement | null,
}

interface CustomSelectProps {
  children?: React.ReactNode,
  itemEffect?: "focus" | "active"
}

function Dropdown({ children, itemEffect = "active" }: CustomSelectProps) {
  const [showDesktop, setShowDesktop] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [dropdownElements, setDropdownElements]  = useState<DropdownElements>({
    toggle: null,
    menu: null
  });
  const [itemsState, setItemsState] = useState<ItemStates>({
    active: "",
    focus: "",
    type: itemEffect,
  });


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const eventTarget = event.target as Element
      if (
        dropdownElements.toggle &&
        dropdownElements.menu &&
        !dropdownElements.toggle.contains(eventTarget) &&
        !dropdownElements.menu.contains(eventTarget)
      ) {
        setShowDesktop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownElements]);


  return (
    <DropdownContext.Provider value={{
      showDesktop, setShowDesktop,
      showMobile, setShowMobile,
      itemsState, setItemsState,
      dropdownElements, setDropdownElements
    }}>
      {children}
    </DropdownContext.Provider>
  );
}

export default Dropdown;