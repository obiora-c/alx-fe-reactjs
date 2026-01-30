import { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username) return;

    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const data = await searchUsers({
        username,
        location,
        repos,
        page: 1,
      });
      setUsers(data.items);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const data = await searchUsers({
      username,
      location,
      repos,
      page: nextPage,
    });

    setUsers((prev) => [...prev, ...data.items]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-lg p-4 space-y-4"
      >
        <input
          type="text"
          placeholder="GitHub username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location (optional)"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Minimum repositories"
          className="w-full border p-2 rounded"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* States */}
      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {users.length > 0 && !loading && (
        <button
          onClick={loadMore}
          className="block mx-auto mt-6 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
