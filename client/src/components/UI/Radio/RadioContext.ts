import React, {createContext} from "react";


type RadioContextValue = {
  radioId: string,
  setRadioId: React.Dispatch<React.SetStateAction<string>>
}

export const RadioContext = createContext<RadioContextValue>({
  radioId: "",
  setRadioId: () => {}
});
