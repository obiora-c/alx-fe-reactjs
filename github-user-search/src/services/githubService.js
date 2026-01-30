import axios from "axios";

const BASE_URL = "https://api.github.com/search/users";

export const searchUsers = async ({
  username,
  location,
  repos,
  page = 1,
}) => {
  let query = `${username}`;

  if (location) {
    query += `+location:${location}`;
  }

  if (repos) {
    query += `+repos:>=${repos}`;
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: query,
      page,
      per_page: 10,
    },
  });

  return response.data;
};
