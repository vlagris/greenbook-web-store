import React, {createContext} from "react";

type ItemContextValue = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemContext = createContext<ItemContextValue>({
  show: false,
  setShow: () => {}
});
