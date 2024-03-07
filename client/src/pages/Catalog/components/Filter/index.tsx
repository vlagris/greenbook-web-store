import {Accordion, AccordionContent, AccordionItem} from "@components/UI/Accordion";
import Genres from "@pages/Catalog/components/Filter/Genres.tsx";
import Price from "@pages/Catalog/components/Filter/Price.tsx";
import FilterAccordionButton from "@pages/Catalog/components/Filter/FilterAccordionButton.tsx";
import classes from "./styles.module.scss";



function Filter() {

  const accordionItems = [
    { title: "Жанры", Component: () => <Genres/> },
    { title: "Цена", Component: () => <Price priceMin={100} priceMax={10000}/> }
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