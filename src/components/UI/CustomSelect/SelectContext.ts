import React, { createContext } from "react";

type ISelectContext = {
  selectValue: string,
  setSelectValue: React.Dispatch<React.SetStateAction<string>>
}

export const SelectContext = createContext<ISelectContext>({
  selectValue: "",
  setSelectValue: () => {}
});