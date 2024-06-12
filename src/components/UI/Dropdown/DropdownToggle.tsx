import React, {useContext} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";


interface DropdownToggleProps {
  children: React.ReactNode,
  className?: string
}

function DropdownToggle({ children }: DropdownToggleProps) {
  const {show, setShow} = useContext(DropdownContext);

  function handleClick() {
    setShow(!show);
  }

  return (
    <button onClick={handleClick}>
      { children }
    </button>
  );
}

export default DropdownToggle;