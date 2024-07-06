import React, {useEffect, useState} from 'react';
import {Genre} from "@/types";
import Breadcrumbs, {Crumb} from "@components/Breadcrumbs";


interface CatalogBreadcrumbsProps {
  genres: Genre[] | undefined,
  pathName: string | undefined
}

function CatalogBreadcrumbs({genres, pathName}: CatalogBreadcrumbsProps) {
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);

  useEffect(() => {
    if (!genres || !pathName) {
      return;
    }
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