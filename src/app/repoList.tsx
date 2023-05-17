'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import RepoCell from './repoCell';

const LOCAL_STORAGE_KEY = 'favourites';
const FILTER_VALUES = {
  ALL: 'all',
  FAVOURITES: 'favourites',
};

const RepoList = ({ repos }) => {
  const [selectedFilter, setSelectedFilter] = useState(FILTER_VALUES.ALL);
  const [displayedRepos, setDisplayedRepos] = useState(repos);

  const [favourites, setFavourites] = useState<number[]>(() => {
    const favourites = localStorage.getItem(LOCAL_STORAGE_KEY);
    return favourites ? JSON.parse(favourites) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const favouriteHandler = (id: number) => () => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((item) => item !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  const buttonClasses = classNames('border-2 rounded border-[#fff] px-[32px]');

  return (
    <div className="grid grid-cols-1 gap-[16px]">
      <div className="flex gap-[16px]">
        <button
          className={classNames(buttonClasses, {
            'bg-[#fff] text-[#1e1a25] font-bold':
              selectedFilter === FILTER_VALUES.ALL,
          })}
          onClick={() => {
            setDisplayedRepos(repos);
            setSelectedFilter(FILTER_VALUES.ALL);
          }}
        >
          All
        </button>
        <button
          className={classNames(buttonClasses, {
            'bg-[#fff] text-[#1e1a25] font-bold':
              selectedFilter === FILTER_VALUES.FAVOURITES,
          })}
          onClick={() => {
            setDisplayedRepos(
              repos.filter((repo) => favourites.includes(repo.id))
            );

            setSelectedFilter(FILTER_VALUES.FAVOURITES);
          }}
        >
          Favourites
        </button>
      </div>
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
