'use client';

import { useState } from 'react';
import { FaBookmark, FaRegBookmark, FaRegStar } from 'react-icons/fa';
import classNames from 'classnames';

const RepoList = ({ repos }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [displayedRepos, setDisplayedRepos] = useState(repos);

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
            'bg-[#fff] text-[#1e1a25] font-bold': selectedFilter === 'all',
          })}
          onClick={() => {
            setDisplayedRepos(repos);
            setSelectedFilter('all');
          }}
        >
          All
        </button>
        <button
          className={classNames(buttonClasses, {
            'bg-[#fff] text-[#1e1a25] font-bold':
              selectedFilter === 'favourites',
          })}
          onClick={() => {
            setDisplayedRepos(
              repos.filter((repo) => favourites.includes(repo.id))
            );

            setSelectedFilter('favourites');
          }}
        >
          Favourites
        </button>
      </div>
      {displayedRepos.map((repo) => {
        const favourited = favourites.includes(repo.id);
        return (
          <div
            key={repo.id}
            className={classNames('relative p-[16px] rounded-md', {
              [favourited ? 'bg-yellow-500 text-yellow-900' : 'bg-[#1e1a25]']:
                true,
            })}
          >
            <div
              className="cursor-pointer absolute  top-[16px] right-[16px]"
              onClick={favouriteHandler(repo.id)}
            >
              {favourited ? (
                <FaBookmark className="w-[16px] h-[16px]" />
              ) : (
                <FaRegBookmark className="w-[16px] h-[16px]" />
              )}
            </div>

            <div className="space-y-[8px] leading-tight">
              <p className="font-bold">{repo.full_name}</p>
              <p className="max-w-prose">{repo.description}</p>
              <div className="flex gap-[8px] items-center">
                <FaRegStar />
                <p className="leading-none">{repo.stargazers_count}</p>
              </div>
              {repo.language && <p>{repo.language}</p>}
              <a className="inline-block underline" href={repo.html_url}>
                <p>Link to repo</p>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepoList;
