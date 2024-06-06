import React from 'react';
import {FilterListItem} from "@pages/Catalog/components/Filters/CheckboxList/index.tsx";
import Checkbox from "@components/UI/Checkbox";
import classes from "@pages/Catalog/components/Filters/styles.module.scss";


interface CheckboxListItemProps {
  item: FilterListItem
  onChange: () => void
}

function CheckboxListItem({item, onChange}: CheckboxListItemProps) {
  return (
    <li className={classes.checkbox_list_item}>
      <Checkbox
        isChecked={item.checked}
        onChange={onChange}
      >
        <span className={classes.checkbox_list_text}>
          {item.name}
        </span>
      </Checkbox>
    </li>
  );
}

export default CheckboxListItem;