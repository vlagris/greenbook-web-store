import React, { createContext } from "react";
import {ItemStates} from "@components/UI/Dropdown/Dropdown.tsx";


type IDropdownContext = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  itemsState: ItemStates,
  setItemsState: React.Dispatch<React.SetStateAction<ItemStates>>,
}

export const DropdownContext = createContext<IDropdownContext>({
  show: false,
  setShow: () => {},
  itemsState: {
    active: "",
    focus: "",
    type: "active"
  },
  setItemsState: () => {},
});