import {createPortal} from "react-dom";
import React from "react";

function usePortal({ children }: {children: React.ReactNode}) {

  return createPortal(children, document.body);
}



export default usePortal