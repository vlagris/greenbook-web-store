import React from "react";


interface AccordionProps {
  children: React.ReactNode,
  className?: string
}

function Accordion({children, className}: AccordionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Accordion;
