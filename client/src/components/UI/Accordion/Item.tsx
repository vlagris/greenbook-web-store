import React, {useState} from "react";
import {ItemContext} from "@components/UI/Accordion/ItemContext.ts";


interface ItemProps {
  children: React.ReactNode,
  className?: string
}

function Item({children, className}: ItemProps) {
  const [show, setShow] = useState(true);

  return (
    <div className={className}>
      <ItemContext.Provider value={{show, setShow}}>
        {children}
      </ItemContext.Provider>
    </div>
  );
}

export default Item;