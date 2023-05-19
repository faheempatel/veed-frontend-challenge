'use client';

import { useEffect, useState } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import type { FavouriteHandler, Filter, Repo, SelectedFilter } from '../types';

import RepoCell from './repoCell';
import Filters from './filters';

const LOCAL_STORAGE_KEY = 'favourites';
const FILTER_LABELS: Record<Uppercase<SelectedFilter>, SelectedFilter> = {
  ALL: 'All',
  FAVOURITES: 'Favourites',
};

const RepoList = ({ repos }: { repos: Repo[] }) => {
  const [displayedRepos, setDisplayedRepos] = useState(repos);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(
    FILTER_LABELS.ALL
  );

  const [favourites, setFavourites] = useLocalStorage<number[]>(
    LOCAL_STORAGE_KEY,
    []
  );

  // This is here to resolve a hydration mismatch between the server and client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
        const onlyFavourites = repos.filter((repo) =>
          favourites.includes(repo.id)
        );
        setDisplayedRepos(onlyFavourites);
        setSelectedFilter(FILTER_LABELS.FAVOURITES);
      },
    },
  ];

  return (
    <div>
      <Filters filterList={filterList} selectedFilter={selectedFilter} />
      <ul className="mt-[24px] grid grid-cols-1 gap-[16px]">
        {displayedRepos.map((repo) => {
          const favourited = hasMounted && favourites.includes(repo.id);
          return (
            <li key={repo.id}>
              <RepoCell
                repo={repo}
                favourited={favourited}
                favouriteHandler={favouriteHandler}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RepoList;
