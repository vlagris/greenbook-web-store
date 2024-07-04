import React from 'react';
import classes from "@pages/Account/styles.module.scss";



interface PanelHeaderProps {
  children?: React.ReactNode
}

function PanelHeader({children}: PanelHeaderProps) {
  return (
    <div className={classes.panel_header}>
      {children}
    </div>
  );
}

export default PanelHeader;