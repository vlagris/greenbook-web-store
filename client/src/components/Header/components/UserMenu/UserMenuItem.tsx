import React from 'react';
import {DropdownItem} from "@components/UI/Dropdown";
import classes from "@components/Header/styles.module.scss";


interface UserMenuItemProps {
  children?: React.ReactNode,
  id: string | number,
  onClick?: () => void
}

function UserMenuItem({ children, id, onClick }: UserMenuItemProps) {
  return (
    <DropdownItem id={id} onClick={onClick}>
      <div className={classes.user_menu_item}>
        {children}
      </div>
    </DropdownItem>

  );
}

export default UserMenuItem;