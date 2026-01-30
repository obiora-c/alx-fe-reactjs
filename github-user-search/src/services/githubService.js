// src/services/githubService.js
import axios from "axios";

// Advanced search using GitHub Search API
export const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  let query = "";
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`;

  const response = await axios.get(url);

  // For each user, we can fetch additional details (like location and repo count)
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const res = await axios.get(user.url); // user.url gives full user details
      return res.data;
    })
  );

  return {
    total_count: response.data.total_count,
    items: detailedUsers,
  };
};
