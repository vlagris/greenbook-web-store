import React, { createContext } from "react";
import {DropdownElements, ItemStates} from "@components/UI/Dropdown/Dropdown.tsx";



type IDropdownContext = {
  showDesktop: boolean,
  setShowDesktop: React.Dispatch<React.SetStateAction<boolean>>,
  showMobile: boolean,
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>,
  itemsState: ItemStates,
  setItemsState: React.Dispatch<React.SetStateAction<ItemStates>>,
  dropdownElements: DropdownElements,
  setDropdownElements: React.Dispatch<React.SetStateAction<DropdownElements>>
}

export const DropdownContext = createContext<IDropdownContext>({
  showDesktop: false,
  setShowDesktop: () => {},
  showMobile: false,
  setShowMobile: () => {},
  itemsState: {
    active: "",
    focus: "",
    type: "active",
  },
  setItemsState: () => {},
  dropdownElements: {
    toggle: null,
    menu: null
  },
  setDropdownElements: () => {}
});