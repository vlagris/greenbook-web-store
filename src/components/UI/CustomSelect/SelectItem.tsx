import React, {useContext, useEffect} from 'react';
import {SelectContext} from "@components/UI/CustomSelect/SelectContext.ts";
import {DropdownItem} from "@components/UI/Dropdown";


interface SelectItemProps {
  children: React.ReactNode,
  id: number | string,
  value: string,
  active?: boolean,
  onClick?: () => void
}


function SelectItem({ children, active, id , value, onClick }: SelectItemProps) {
  const {setSelectValue} = useContext(SelectContext);


  useEffect(() => {
    if (active) {
      setSelectValue(value)
    }
  }, []);

  function handleClick() {
    setSelectValue(value)

    if (onClick) {
      onClick()
    }
  }

  return (
    <DropdownItem id={id} onClick={handleClick} active={active}>
      {children}
    </DropdownItem>
  );
}

export default SelectItem;