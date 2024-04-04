import React, {useState} from "react";
import classes from "@components/UI/Checkbox/style.module.scss";
// import  CheckIcon from "@assets/check.svg?react";


interface CheckboxProps {
  children: React.ReactNode,
  isChecked?: boolean,
}

function Checkbox({children, isChecked}: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);
  function handleClick(): void {
    if (typeof isChecked === "boolean") {
      setChecked(!checked);
    }
  }

  return (
    <label className={classes.checkbox_label}>
      <input
        type="checkbox"
        role="checkbox"
        className={classes.checkbox}
        onChange={handleClick}
        defaultChecked={checked}
      />
      {children}
    </label>
  );
}

export default Checkbox;