import React, {useState} from 'react';
import {SelectContext} from "@components/UI/CustomSelect/SelectContext.ts";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownButton, DropdownIcon} from "@components/UI/Dropdown";


interface CustomSelectProps {
  children?: React.ReactNode,
  placeholder: string
}

function CustomSelect({ children, placeholder }: CustomSelectProps) {
  const [selectValue, setSelectValue] = useState(placeholder);


  return (
    <SelectContext.Provider value={{selectValue, setSelectValue}}>
      <Dropdown>
        <DropdownToggle>
          <DropdownButton>
            {selectValue}
            <DropdownIcon/>
          </DropdownButton>
        </DropdownToggle>

        <DropdownMenu>
          {children}
        </DropdownMenu>
      </Dropdown>
    </SelectContext.Provider>
  );
}

export default CustomSelect;