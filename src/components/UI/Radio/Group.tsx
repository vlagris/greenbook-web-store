import React, {useState} from "react";
import {RadioContext} from "@components/UI/Radio/RadioContext";


function Group({children}: {children: React.ReactNode}) {
  const [radioId, setRadioId] = useState("");

  return (
    <RadioContext.Provider value={{radioId, setRadioId}}>
      {children}
    </RadioContext.Provider>
  );
}

export default Group;