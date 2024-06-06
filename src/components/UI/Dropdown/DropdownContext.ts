import React, { createContext } from "react";
import {ItemStates} from "@components/UI/Dropdown/Dropdown.tsx";


type IDropdownContext = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  itemStates: ItemStates,
  setItemStates: React.Dispatch<React.SetStateAction<ItemStates>>,
}

export const DropdownContext = createContext<IDropdownContext>({
  show: false,
  setShow: () => {},
  itemStates: {
    active: "",
    focus: "",
  },
  setItemStates: () => {},
});