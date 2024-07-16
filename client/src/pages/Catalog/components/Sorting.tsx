import React, {useLayoutEffect, useState} from 'react';
import { Dropdown, DropdownButton, DropdownIcon, DropdownItem, DropdownMenu, DropdownToggle } from "@components/UI/Dropdown";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import classes from "@pages/Catalog/styles.module.scss";



const sorting = [
  { id: 1, name: "Популярные", type: "popular"},
  { id: 2, name: "Новинки", type: "new"},
  { id: 3, name: "Сначала дорогие", type: "price_desc"},
  { id: 4, name: "Сначала дешевые", type: "price_asc"},
  { id: 5, name: "Высокий рейтинг", type: "rating"},
]


interface SortingProps {
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function Sorting({queryParams, setQueryParams}: SortingProps) {
  const [active, setActive] = useState(sorting[0].type);


  useLayoutEffect(() => {
    if (queryParams.sort && queryParams.sort !== active) {
      setActive(queryParams.sort);
    }
  }, [queryParams]);


  function createOnClick(type: string) {
    return () => {
      setQueryParams({...queryParams, sort: type });
      setActive(type);
    }
  }


  return (
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
  );
}

export default Sorting;