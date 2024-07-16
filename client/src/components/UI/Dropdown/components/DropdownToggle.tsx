import React from 'react';
import DropdownToggleDesktop from "@components/UI/Dropdown/components/desktop/DropdownToggleDesktop.tsx";
import DropdownToggleMobile from "@components/UI/Dropdown/components/mobile/DropdownToggleMobile.tsx";



export interface DropdownToggleProps {
  children?: React.ReactNode,
  className?: string
}

function DropdownToggle({ children, className }: DropdownToggleProps) {

  return (
    <>
      <DropdownToggleDesktop className={className}>
        {children}
      </DropdownToggleDesktop>
      <DropdownToggleMobile className={className}>
        {children}
      </DropdownToggleMobile>
    </>
  )
    ;
}

export default DropdownToggle;