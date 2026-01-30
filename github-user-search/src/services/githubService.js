import axios from "axios";

const SEARCH_BASE_URL = "https://api.github.com/search/users";
const USER_BASE_URL = "https://api.github.com/users";

/* ------------------------------
   AXIOS → Advanced User Search
--------------------------------*/
export const searchUsers = async ({
  username,
  location,
  repos,
  page = 1,
}) => {
  let query = username;

  if (location) {
    query += `+location:${location}`;
  }

  if (repos) {
    query += `+repos:>=${repos}`;
  }

  const response = await axios.get(SEARCH_BASE_URL, {
    params: {
      q: query,
      page,
      per_page: 10,
    },
  });

  return response.data;
};

/* ------------------------------
   FETCH → Single User Details
--------------------------------*/
export const fetchUserDetails = async (username) => {
  const response = await fetch(`${USER_BASE_URL}/${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
};
