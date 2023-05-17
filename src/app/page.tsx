const fetchPopularRepositories = async ({
  createdDaysAgo = 7,
  sort = 'stars',
  order = 'desc',
  perPage = 10,
} = {}) => {
  const apiUrl = 'https://api.github.com/search/repositories';

  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - createdDaysAgo);
  const createdDateString = createdDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  const query = `created:>${createdDateString}`;

  const url = `${apiUrl}?q=${query}&sort=${sort}&order=${order}&per_page=${perPage}`;
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
  console.log(repos);

  return (
    <main className="">
      <h1 className="">
        Github
        <br /> repos
      </h1>
      <p className="">Most starred repos created in the last 7 days</p>
      {repos.map((repo) => {
        return (
          <div key={repo.id}>
            <div>
              <p>{repo.full_name}</p>
              <p>{repo.description}</p>
              <p>{repo.stargazers_count}</p>
              {repo.language && <p>{repo.language}</p>}
              <a href={repo.html_url}>
                <p>Link to repo</p>
              </a>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Home;
