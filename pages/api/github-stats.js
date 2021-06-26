export default async (req, res) => {
  const headers = {
    Authorization: 'Token ' + process.env.GITHUB_KEY,
  };

  // followers
  const followers_url =
    'https://api.github.com/users/lestercardoz11/followers?per_page=1000';
  const followers_response = await fetch(followers_url, { headers: headers });
  const followers_json = await followers_response.json();
  const followers = Object.keys(followers_json).length;

  // projects
  const projects_url =
    'https://api.github.com/users/lestercardoz11/repos?per_page=1000';
  const projects_response = await fetch(projects_url, { headers: headers });
  const projects_json = await projects_response.json();
  const projects = Object.keys(projects_json).length;

  // stars
  var stars = 0;
  projects_json.forEach((f) => {
    stars += f.stargazers_count;
  });

  return res.status(200).json({
    followers,
    projects,
    stars,
  });
};
