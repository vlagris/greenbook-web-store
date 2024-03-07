import React, {useEffect} from "react";
import Portal from "@components/UI/Modal/Portal";
import classes from "./styles.module.scss";
import {joinClasses} from "@/utils/joinClasses.ts";

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
    if (document.body.offsetHeight > window.innerHeight) {
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
          <div
            onClick={handleClick}
            className={className? joinClasses([classes.overlay, className]) : classes.overlay}
          >
            {children}
          </div>
        </Portal>
      }
    </>
  );
}

export default Modal;