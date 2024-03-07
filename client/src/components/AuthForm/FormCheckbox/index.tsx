import React from 'react';
import classes from "@components/AuthForm/FormCheckbox/styles.module.scss";
import Checkbox from "@components/UI/Checkbox";

function FormCheckbox({children}: {children: React.ReactNode}) {

  return (
    <Checkbox>
      <span className={classes.text}>{children}</span>
    </Checkbox>
  );
}

export default FormCheckbox;
