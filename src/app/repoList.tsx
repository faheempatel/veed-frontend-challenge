'use client';

const RepoList = ({ repos }) => {
  return (
    <>
      {repos.map((repo) => {
        return (
          <div key={repo.id}>
            <div className="space-y-[8px] leading-tight">
              <p className="font-bold">{repo.full_name}</p>
              <p className="max-w-prose">{repo.description}</p>
              <div className="flex gap-[8px] items-center">
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
    </>
  );
};

export default RepoList;
