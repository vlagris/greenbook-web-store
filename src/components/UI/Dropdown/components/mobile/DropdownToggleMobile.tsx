import React, {useContext} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import {DropdownToggleProps} from "@components/UI/Dropdown/components/DropdownToggle.tsx";
import classes from "@components/UI/Dropdown/styles.module.scss";



function DropdownToggle({ children }: DropdownToggleProps) {
  const {showMobile, setShowMobile} = useContext(DropdownContext);


  const handleClick = () => setShowMobile(!showMobile)


  return (
    <button
      className={classes.dropdown_toggle_mobile}
      onClick={handleClick}
    >
      {children}
    </button>
  )
    ;
}

export default DropdownToggle;