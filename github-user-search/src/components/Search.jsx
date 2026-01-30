import { useState } from "react";
import { searchUsers, fetchUserDetails } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) return;

    setLoading(true);
    setError("");
    setUsers([]);
    setSelectedUser(null);

    try {
      const data = await searchUsers({
        username,
        location,
        repos,
      });
      setUsers(data.items);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (login) => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchUserDetails(login);
      setSelectedUser(data);
    } catch {
      setError("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <input
          className="w-full border p-2 rounded"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Minimum repositories"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Search Users
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.login)}
            className="cursor-pointer border p-4 rounded hover:bg-gray-50"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <p className="font-semibold mt-2">{user.login}</p>
          </div>
        ))}
      </div>

      {/* Selected User Details (fetch) */}
      {selectedUser && (
        <div className="mt-6 border rounded p-4 bg-white">
          <h2 className="text-xl font-bold">{selectedUser.name}</h2>
          <p>Location: {selectedUser.location || "N/A"}</p>
          <p>Repositories: {selectedUser.public_repos}</p>
          <a
            href={selectedUser.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            View Full Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
