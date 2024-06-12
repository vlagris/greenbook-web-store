import React, {useEffect} from "react";
import {clsx} from "clsx";
import Portal from "@components/UI/Portal";
import classes from "./styles.module.scss";

interface ModalProps {
  children: React.ReactNode,
  show: boolean,
  onHide: () => void,
  className?: string,
}

function Modal({ children, show, onHide, className }: ModalProps) {

  useEffect(() => {
    if (!show) {
      document.body.className = "";
      document.body.style.paddingRight = "";
      return;
    }
    if (document.body.offsetWidth < window.innerWidth) {
      document.body.style.paddingRight = "6px";
    }
    document.body.className = "body_overflow";
  }, [show]);


  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      onHide()
    }
  }

  return (
    <>
      {show &&
        <Portal>
          <div className={clsx(classes.overlay, className)} onClick={handleClick}>
            {children}
          </div>
        </Portal>
      }
    </>
  );
}

export default Modal;