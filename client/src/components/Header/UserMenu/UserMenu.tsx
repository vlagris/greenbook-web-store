import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu} from "@components/UI/Dropdown";
import UserMenuItem from "@components/Header/UserMenu/UserMenuItem.tsx";
import classes from "@components/Header/styles.module.scss";
import UserIcon from '@assets/icons/user.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';

interface UserMenuProps {
  handleLogout: () => void
}

function UserMenu({handleLogout}: UserMenuProps) {
  return (
    <Dropdown>
      <DropdownToggle>
        <UserIcon className={classes.icon_stroke}/>
      </DropdownToggle>

      <DropdownMenu>

        <UserMenuItem id={1} onClick={handleLogout}>
          <LogoutIcon className={classes.user_menu_icon}/>
          <span className={classes.user_menu_text}>Выйти</span>
        </UserMenuItem>

      </DropdownMenu>
    </Dropdown>
  );
}

export default UserMenu;