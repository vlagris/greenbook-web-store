import React from 'react';
import classes from "@pages/Account/styles.module.scss";



interface TitleInputWrapProps {
  title: string,
  children: React.ReactNode
}

function TitleInputWrap({title, children}: TitleInputWrapProps) {
  return (
    <div className={classes.titleInputWrap}>
      <p className={classes.titleInputWrap_title}>{title}</p>
      {children}
    </div>
  );
}

export default TitleInputWrap;