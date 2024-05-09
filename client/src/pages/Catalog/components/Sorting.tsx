import React, {useLayoutEffect, useState} from 'react';
import {Filters} from "@pages/Catalog/useFilters.ts";
import { Dropdown, DropdownButton, DropdownIcon, DropdownItem, DropdownMenu, DropdownToggle } from "@components/UI/Dropdown";
import classes from "@pages/Catalog/styles.module.scss";



const sorting = [
  { id: 1, name: "Популярные", type: "popular"},
  { id: 2, name: "Новинки", type: "new"},
  { id: 3, name: "Сначала дорогие", type: "price_desc"},
  { id: 4, name: "Сначала дешевые", type: "price_asc"},
  { id: 5, name: "Высокий рейтинг", type: "rating"},
]


interface SortingProps {
  filters: Filters,
  setFilters:  React.Dispatch<React.SetStateAction<Filters>>,
}

function Sorting({filters, setFilters}: SortingProps) {
  const [active, setActive] = useState(sorting[0].type);


  useLayoutEffect(() => {
    if (filters.sort && filters.sort !== active) {
      setActive(filters.sort);
    }
  }, [filters]);


  function createOnClick(type: string) {
    return () => {
      setFilters({...filters, sort: type });
      setActive(type);
    }
  }


  return (
    <div className={classes.sorting}>
        <Dropdown>
          <DropdownToggle>
            <DropdownButton>
              {sorting.map(item => (
                item.type === active && item.name
              ))}
              <DropdownIcon/>
            </DropdownButton>
          </DropdownToggle>

          <DropdownMenu>
            {sorting.map(item => (
              <DropdownItem
                key={item.id}
                id={item.id}
                onClick={createOnClick(item.type)}
                active={item.type === active}
              >
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
    </div>
  );
}

export default Sorting;