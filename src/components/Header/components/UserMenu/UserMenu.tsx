import React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {useLogoutMutation} from "@/services/api";
import {removeCart} from "@/store";
import {Dropdown, DropdownToggle, DropdownMenu} from "@components/UI/Dropdown";
import UserMenuItem from "@components/Header/components/UserMenu/UserMenuItem.tsx";
import classes from "@components/Header/styles.module.scss";
import UserIcon from '@assets/icons/user.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';



function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const {isAuth} = useAuth();


  async function handleLogout() {
    await logout().unwrap().then(() => {
      dispatch(removeCart())
      navigate("/")
    });
  }


  if (!isAuth) {
    return null;
  }


  return (
    <Dropdown itemEffect="focus">
      <DropdownToggle>
        <UserIcon className={classes.icon_stroke}/>
      </DropdownToggle>

      <DropdownMenu>
        <UserMenuItem id={1} to="/account/settings">
          <SettingsIcon className={classes.user_menu_icon}/>
          <span className={classes.user_menu_text}>Настройки</span>
        </UserMenuItem>
        <UserMenuItem id={2} onClick={handleLogout}>
          <LogoutIcon className={classes.user_menu_icon}/>
          <span className={classes.user_menu_text}>Выйти</span>
        </UserMenuItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserMenu;