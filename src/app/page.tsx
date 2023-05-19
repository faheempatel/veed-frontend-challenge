import RepoList from './components/repoList';

const fetchPopularRepositories = async ({
  createdDaysAgo = 7,
  order = 'desc',
  perPage = 10,
} = {}) => {
  const apiUrl = 'https://api.github.com/search/repositories';

  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - createdDaysAgo);
  const createdDateString = createdDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  const query = `created:>${createdDateString}`;

  const url = `${apiUrl}?q=${query}&sort=stars&order=${order}&per_page=${perPage}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data.items;
  } else {
    throw new Error(data.message);
  }
};

const Home = async () => {
  const repos = await fetchPopularRepositories();

  return (
    <main className="mx-auto p-[16px] bg-[#05010d] space-y-[24px] text-white w-full max-w-[800px]">
      <h1 className="text-5xl text-white font-black uppercase leading-none">
        Github
        <br />
        repos
      </h1>
      <p className="text-[#9b999e]">
        Most starred repos created in the last 7 days
      </p>
      <RepoList repos={repos} />
    </main>
  );
};

export default Home;
