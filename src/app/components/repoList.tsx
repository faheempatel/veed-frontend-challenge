'use client';

import { useEffect, useState } from 'react';

import type { FavouriteHandler, Filter, SelectedFilter } from '../types';

import RepoCell from './repoCell';
import Filters from './filters';

const LOCAL_STORAGE_KEY = 'favourites';
const FILTER_LABELS: Record<Uppercase<SelectedFilter>, SelectedFilter> = {
  ALL: 'All',
  FAVOURITES: 'Favourites',
};

// TODO: Add type for repos
const RepoList = ({ repos }: { repos: any }) => {
  const [displayedRepos, setDisplayedRepos] = useState(repos);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(
    FILTER_LABELS.ALL
  );

  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavourites = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const favouriteHandler: FavouriteHandler = (selectedId) => (event) => {
    event.preventDefault();
    if (favourites.includes(selectedId)) {
      setFavourites(favourites.filter((id) => id !== selectedId));
    } else {
      setFavourites([...favourites, selectedId]);
    }
  };

  const filterList: Filter[] = [
    {
      label: FILTER_LABELS.ALL,
      onClick: () => {
        setDisplayedRepos(repos);
        setSelectedFilter(FILTER_LABELS.ALL);
      },
    },
    {
      label: FILTER_LABELS.FAVOURITES,
      onClick: () => {
        setDisplayedRepos(repos.filter((repo) => favourites.includes(repo.id)));
        setSelectedFilter(FILTER_LABELS.FAVOURITES);
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-[16px]">
      <Filters filterList={filterList} selectedFilter={selectedFilter} />
      {displayedRepos.map((repo) => {
        const favourited = favourites.includes(repo.id);
        return (
          <RepoCell
            key={repo.id}
            repo={repo}
            favourited={favourited}
            favouriteHandler={favouriteHandler}
          />
        );
      })}
    </div>
  );
};

export default RepoList;
