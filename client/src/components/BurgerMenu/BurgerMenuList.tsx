import React from 'react';
import {Genre} from "@/types";
import BurgerMenuItem from "@components/BurgerMenu/BurgerMenuItem.tsx";



interface BurgerMenuListProps {
  genres: Genre[] | undefined,
  onClick: () => void
}

function BurgerMenuList({genres, onClick}: BurgerMenuListProps) {


  return (
    <ul>
      {genres && genres.map((genre) => (
        <BurgerMenuItem
          key={genre.id}
          to={`/catalog/${genre.pathName}`}
          name={genre.name}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

export default BurgerMenuList;