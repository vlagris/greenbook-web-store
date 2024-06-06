import React, {useEffect, useState} from 'react';
import {QueryParams} from "@/hooks/useQueryParams.ts";
import {FilterItem, FilterSelect} from "@/types.ts";
import CustomInput from "@components/UI/CustomInput";
import CheckboxListItem from "@pages/Catalog/components/Filters/CheckboxList/CheckboxListItem.tsx";
import classes from "../styles.module.scss";



export type FilterListItem = FilterItem & {
  checked: boolean
}

function createListItems(items: FilterItem[] ,queryParams: QueryParams, key: string): FilterListItem[] {
  const authorsId = queryParams[key]?.split(",") || [];
  return items.map(item => {
    return {...item, checked: authorsId.includes(item.id)}
  })
}


interface FilterListProps {
  filter: FilterSelect,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function CheckboxList({filter, queryParams, setQueryParams}: FilterListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [listItems, setListItems] = useState(createListItems(filter.items, queryParams, filter.key));
  const [searchResult, setSearchResult] = useState(listItems);


  useEffect(() => {
    const newListItems: FilterListItem[] = createListItems(filter.items, queryParams, filter.key);
    setListItems(newListItems);
  }, [queryParams[filter.key]]);


  useEffect(() => {
    const result = listItems.filter(listItem => {
      return listItem.name.toLowerCase().includes(searchValue.toLowerCase())
    });
    setSearchResult([...result]);
  }, [searchValue, listItems]);


  function createHandleCheckboxChange(id: string) {
    return () => {
      const checkedItems: string[] = [];
      listItems.forEach(item => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        if (item.checked) {
          checkedItems.push(item.id);
        }
      });
      if (checkedItems.length !== 0) {
        setQueryParams({...queryParams, authors: checkedItems.join(",")});
      } else  {
        setQueryParams({...queryParams, authors: null});
      }
    }
  }


  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  }


  return (
    <div>
      <CustomInput
        size="small"
        type="text"
        className={classes.checkbox_list_search}
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Я ищу..."
      />

      <ul className={classes.checkbox_list_list}>
        {searchResult.map(item =>
          <CheckboxListItem
            key={item.id}
            item={item}
            onChange={createHandleCheckboxChange(item.id)}
          />
        )}
      </ul>
    </div>
  );
}

export default CheckboxList;
