import React from 'react';
import {Link} from "react-router-dom";
import {DropdownItem} from "@components/UI/Dropdown";
import classes from "@components/Header/styles.module.scss";


interface UserMenuItemProps {
  children?: React.ReactNode,
  id: string | number,
  onClick?: () => void,
  to?: string
}

function UserMenuItem({ children, id, onClick, to }: UserMenuItemProps) {
  return (
    <>
      {to ?
          <Link to={to}>
            <DropdownItem id={id} onClick={onClick}>
              <div className={classes.user_menu_item}>
                {children}
              </div>
            </DropdownItem>
          </Link>
        :
        <DropdownItem id={id} onClick={onClick}>
          <div className={classes.user_menu_item}>
            {children}
          </div>
        </DropdownItem>
      }
    </>
  );
}

export default UserMenuItem;