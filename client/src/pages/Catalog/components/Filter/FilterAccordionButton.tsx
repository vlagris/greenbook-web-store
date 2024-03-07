import React from "react";
import {AccordionButton, AccordionIcon} from "@components/UI/Accordion";
import classes from "./styles.module.scss";

function FilterAccordionButton({children}: {children: React.ReactNode}) {
  return (
    <AccordionButton className={classes.accordion_btn}>
      <span className={classes.accordion_btn_title}>{children}</span>
      <AccordionIcon/>
    </AccordionButton>
  );
}

export default FilterAccordionButton;