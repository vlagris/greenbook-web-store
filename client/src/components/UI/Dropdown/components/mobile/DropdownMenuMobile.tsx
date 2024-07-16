import React, {useContext} from 'react';
import {DropdownContext} from "@components/UI/Dropdown/DropdownContext.ts";
import classes from "@components/UI/Dropdown/styles.module.scss";
import {clsx} from "clsx";
import Modal from "@components/UI/Modal";



interface DropdownMenuMobileProps {
  children?: React.ReactNode,
}

function DropdownMenuMobile({ children }: DropdownMenuMobileProps) {
  const { showMobile, setShowMobile } = useContext(DropdownContext);


  const onClose = () => setShowMobile(!showMobile);


  return (
    <Modal show={showMobile} onHide={onClose}>
      <div className={classes.dropdown_mobile_menu_wrap}>
        <div
          className={clsx(
            classes.dropdown_menu,
            classes.dropdown_mobile_menu,
            showMobile && classes.dropdown_menu_show
          )}
        >
          <ul className={classes.dropdown_list}>
            {children}
          </ul>
        </div>
      </div>
    </Modal>
  );
}


export default DropdownMenuMobile;