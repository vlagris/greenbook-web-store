import React from "react";
import {createPortal} from "react-dom";



function Portal({ children }: {children: React.ReactNode}) {

  return createPortal(children, document.body);
}

export default Portal