import React, {useState} from "react";
import classes from "@components/UI/Checkbox/style.module.scss";
// import  CheckIcon from "@assets/check.svg?react";



interface CheckboxProps {
  children?: React.ReactNode,
  isChecked?: boolean,
  onChange?: () => void,
}

function Checkbox({children, onChange, isChecked = false}: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);


  function handleChange(): void {
    setChecked(!checked);
    if (onChange) {
      onChange()
    }
  }


  return (
    <label className={classes.checkbox_label}>
      <input
        type="checkbox"
        role="checkbox"
        className={classes.checkbox}
        onChange={handleChange}
        defaultChecked={checked}
      />
      {children}
    </label>
  );
}

export default Checkbox;