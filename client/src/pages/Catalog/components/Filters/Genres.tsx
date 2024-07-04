import React from 'react';
import {clsx} from "clsx";
import {NavLink} from "react-router-dom";
import {useGetGenresQuery} from "@/services/api";
import classes from "./styles.module.scss";

function Genres() {
  const {data: genres} = useGetGenresQuery();

  return (
    <ul className={classes.genres_list}>

      {genres && genres.map((genre) =>
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