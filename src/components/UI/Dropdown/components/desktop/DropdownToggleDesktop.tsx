import React, {useContext, useEffect, useRef} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import {DropdownToggleProps} from "@components/UI/Dropdown/components/DropdownToggle.tsx";
import classes from "@components/UI/Dropdown/styles.module.scss";



function DropdownToggle({ children }: DropdownToggleProps) {
  const {
    showDesktop,
    setShowDesktop,
    setDropdownElements
  } = useContext(DropdownContext);
  const toggleRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const toggleElement = toggleRef.current;
    if (toggleElement) {
      setDropdownElements(prev => ({
        ...prev,
        toggle: toggleElement
      }))
    }
  }, [toggleRef]);


  const handleClick = () => setShowDesktop(!showDesktop)


  return (
    <button
      className={classes.dropdown_toggle_desktop}
      onClick={handleClick}
      ref={toggleRef}
    >
      {children}
    </button>
  )
    ;
}

export default DropdownToggle;