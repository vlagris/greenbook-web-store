import React, {useEffect, useState} from 'react';
import {Genre} from "@/types.ts";
import Breadcrumbs, {Crumb} from "@components/Breadcrumbs";


interface CatalogBreadcrumbsProps {
  genres: Genre[],
  pathName: string | undefined
}

function CatalogBreadcrumbs({genres, pathName}: CatalogBreadcrumbsProps) {
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);

  useEffect(() => {
    const currentGenre = genres.find(genre => genre.pathName === pathName);
    if (currentGenre) {
      setCrumbs([{name: currentGenre.name, pathName: currentGenre.pathName}]);
    }
  }, [genres, pathName]);


  return (
    <Breadcrumbs crumbs={crumbs}/>
  );
}

export default CatalogBreadcrumbs;