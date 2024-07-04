import React from 'react';
import classes from "@pages/Account/styles.module.scss";



interface PanelProps {
  children?: React.ReactNode
}

function Panel({children}: PanelProps) {
  return (
    <div className={classes.panel}>
      {children}
    </div>
  );
}

export default Panel;