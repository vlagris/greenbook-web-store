import React, {useContext} from "react";
import {ItemContext} from "@components/UI/Accordion/ItemContext.ts";
import classes from "./styles.module.scss";

interface ButtonProps {
  children: React.ReactNode,
  className: string
}

function Button({children, className}: ButtonProps) {
  const { show, setShow } = useContext(ItemContext);

  return (
    <div className={`${classes.button} ${className}`} onClick={() => setShow(!show)}>
      {children}
    </div>
  );
}

export default Button;