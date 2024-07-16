import React, {useState} from 'react';
import {clsx} from "clsx";
import {FiltersType} from "@/types";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import Modal from "@components/UI/Modal";
import FiltersItemWrapper from "@pages/Catalog/components/Filters/FiltersItemWrapper.tsx";
import Genres from "@pages/Catalog/components/Filters/Genres.tsx";
import FiltersItem from "@pages/Catalog/components/Filters/FiltersItem.tsx";
import classes from "@pages/Catalog/components/Filters/styles.module.scss";
import FilterIcon from "@assets/icons/filter.svg?react";
import CloseIcon from "@assets/icons/close.svg?react";



interface FiltersDesktopProps {
  filters: FiltersType | undefined,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function FiltersMobile({filters, queryParams, setQueryParams}: FiltersDesktopProps) {
  const [show, setShow ] = useState(false);


  const handleOpen = () => setShow(true)
  const handleClose = () => setShow(false)


  return (
    <>
      <button
        className={clsx(classes.filters_mobile_btn, show && classes.filters_mobile_btn_active)}
        onClick={handleOpen}
      >
        <FilterIcon className={classes.filters_mobile_btn_icon}/>
        Фильтры
      </button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <div className={classes.filters_mobile}>
          <div className={classes.filters_mobile_header}>
            <h4 className={classes.filters_mobile_header_title}>
              Фильтры
            </h4>
            <button
              className={classes.filters_mobile_header_btn}
              onClick={handleClose}
            >
              <CloseIcon/>
            </button>
          </div>

          <div className={classes.filters_mobile_list}>
            <FiltersItemWrapper name="Жанры">
              <Genres/>
            </FiltersItemWrapper>

            {filters && filters.items.map(filter => (
              <FiltersItemWrapper key={filter.key} name={filter.name}>
                <FiltersItem
                  filter={filter}
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                />
              </FiltersItemWrapper>
            ))}
          </div>

          <div className={classes.filters_mobile_footer}>
            <button
              className={clsx("btn btn-fill", classes.filters_mobile_footer_btn)}
              onClick={handleClose}
            >Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FiltersMobile;