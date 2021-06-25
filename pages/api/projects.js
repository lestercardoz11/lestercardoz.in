export default async (req, res) => {
  const headers = {
    Authorization: 'Token ' + process.env.GITHUB_KEY,
  };

  const url = 'https://api.github.com/users/lestercardoz11/repos';
  const response = await fetch(url, { headers: headers });
  const json = await response.json();
  const projectsList = [];

  json.forEach((project) => {
    projectsList.push({
      name: project.name,
      stars: project.stargazers_count,
      url: project.html_url,
      description: project.description,
      language: project.language,
      updated_at: project.updated_at,
      homepage: project.homepage,
    });
  });

  return res.status(200).json({
    repos: projectsList,
  });
};
