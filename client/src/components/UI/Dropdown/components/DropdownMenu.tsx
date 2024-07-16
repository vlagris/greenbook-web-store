import React from 'react';
import DropdownMenuDesktop from "@components/UI/Dropdown/components/desktop/DropdownMenuDesktop.tsx";
import DropdownMenuMobile from "@components/UI/Dropdown/components/mobile/DropdownMenuMobile.tsx";



interface DropdownMenuProps {
  children?: React.ReactNode,
}

function DropdownMenu({ children }: DropdownMenuProps) {


  return (
    <>
      <DropdownMenuDesktop>
        {children}
      </DropdownMenuDesktop>
      <DropdownMenuMobile>
        {children}
      </DropdownMenuMobile>
    </>
  );
}

export default DropdownMenu;