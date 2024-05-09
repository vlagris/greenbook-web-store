import React from "react";
import {Filters} from "@pages/Catalog/useFilters.ts";
import {Accordion, AccordionContent, AccordionItem} from "@components/UI/Accordion";
import Genres from "@pages/Catalog/components/Filter/Genres.tsx";
import Price from "@pages/Catalog/components/Filter/Price.tsx";
import FilterAccordionButton from "@pages/Catalog/components/Filter/FilterAccordionButton.tsx";
import classes from "./styles.module.scss";



interface FilterProps {
  minPrice: number,
  maxPrice: number,
  filters: Filters,
  setFilters:  React.Dispatch<React.SetStateAction<Filters>>,
}

function Filter({minPrice, maxPrice, filters, setFilters}: FilterProps) {
  const accordionItems = [
    { title: "Жанры", Component: () => <Genres/> },
    { title: "Цена", Component: () =>
        <Price
          minPrice={minPrice}
          maxPrice={maxPrice}
          filters={filters}
          setFilters={setFilters}
        />
    }
  ];


  return (
    <div className={classes.filter}>
      <Accordion className={classes.accordion}>

        {accordionItems.map(({title, Component}) => (
          <AccordionItem key={title} className={classes.accordion_item}>

            <FilterAccordionButton>{title}</FilterAccordionButton>

            <AccordionContent>
              <Component/>
            </AccordionContent>

          </AccordionItem>
        ))}

      </Accordion>
    </div>
  );
}

export default Filter;