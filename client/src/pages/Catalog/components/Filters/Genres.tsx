import React from 'react';
import {clsx} from "clsx";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from '@/store/genres';
import classes from "./styles.module.scss";

function Genres() {
  const genres = useAppSelector(genresSelectors.genres);

  return (
    <ul className={classes.genres_list}>

      {genres.map((genre) =>
        <li key={genre.id} className={classes.genres_item}>
          <NavLink
            to={`/catalog/${genre.pathName}`}
            className={({isActive}) => clsx(classes.genres_link, isActive && classes.active)}
          >
            {genre.name}
          </NavLink>
        </li>
      )}

    </ul>
  );
}

export default Genres;