import classNames from 'classnames';
import { FaBookmark, FaRegBookmark, FaRegStar } from 'react-icons/fa';

import type { FavouriteHandler } from '../types';

const RepoCell = ({
  repo,
  favourited,
  favouriteHandler,
}: {
  repo: any;
  favourited: boolean;
  favouriteHandler: FavouriteHandler;
}) => {
  return (
    <div
      className={classNames('relative p-[16px] rounded-md', {
        [favourited ? 'bg-yellow-500 text-yellow-900' : 'bg-[#1e1a25]']: true,
      })}
    >
      <div
        className="cursor-pointer absolute  top-[16px] right-[16px]"
        tabIndex={0}
        aria-label="Favourite"
        aria-roledescription="checkbox"
        aria-checked={favourited}
        onClick={favouriteHandler(repo.id)}
      >
        {favourited ? (
          <FaBookmark title="favourited" className="w-[16px] h-[16px]" />
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
        {repo.language && <p>Language: {repo.language}</p>}
        <a className="inline-block underline" href={repo.html_url}>
          <p>Link to repo</p>
        </a>
      </div>
    </div>
  );
};

export default RepoCell;
