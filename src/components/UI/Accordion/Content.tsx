import React, {useContext, useEffect, useRef, useState} from "react";
import {ItemContext} from "@components/UI/Accordion/ItemContext.ts";
import classes from "./styles.module.scss";

function Content({children}: {children: React.ReactNode}) {
  const {show} = useContext(ItemContext);
  const contextRef = useRef<HTMLDivElement>(null);
  const [contentStyle, setContentStyle] = useState(show? {} : {maxHeight: "0"});

  useEffect(() => {
    if (contextRef.current && show) {
      setContentStyle( {maxHeight: contextRef.current.scrollHeight + "px"});
    } else {
      setContentStyle( {maxHeight: "0"});
    }
  }, [contextRef, show]);


  return (
    <div ref={contextRef} className={classes.content} style={contentStyle}>
      {children}
    </div>
  );
}

export default Content;
