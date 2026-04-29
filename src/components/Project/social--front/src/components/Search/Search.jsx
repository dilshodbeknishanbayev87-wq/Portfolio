import React from "react";
import { axiosInstance } from "../request";
import "./Search.css";

function Search() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await axiosInstance.get("/auth/user", {
      params: { username: query },
    });

    setResults(Array.isArray(res.data) ? res.data : []);
  };

  const toggleFollow = async (p) => {
    const payload = { user_id: p.user_id, username: p.username };

    if (p.has_followed) {
      await axiosInstance.post("/followings/unfollow", payload);
    } else {
      await axiosInstance.post("/followings/follow", payload);
    }

    setResults((prev) =>
      prev.map((u) =>
        (u.user_id || u.username) === (p.user_id || p.username)
          ? { ...u, has_followed: !u.has_followed }
          : u
      )
    );
  };

  return (
    <div className="search">
      <h1 className="search-title">Search</h1>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Username qidiring..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="results">
        <h3 className="results-title">Results</h3>

        {results.length === 0 ? (
          <p className="empty-text">Natija yo‘q</p>
        ) : (
          <ul className="results-list">
            {results.map((p, i) => (
              <li className="result-item" key={p.user_id || p.username || i}>
                <div className="profile-header">
                  {p.user_img ? (
                    <img className="profile-img" src={p.user_img} alt={p.username} />
                  ) : (
                    <div className="profile-img-placeholder">
                      {(p.first_name?.[0] || p.username?.[0] || "?").toUpperCase()}
                    </div>
                  )}

                  <div className="profile-header-info">
                    <div className="profile-name">
                      {p.first_name} 
                    </div>
                    <div className="profile-username">@{p.username}</div>
                  </div>

                  <button
                    className={p.has_followed ? "follow-btn following" : "follow-btn"}
                    onClick={() => toggleFollow(p)}
                  >
                    {p.has_followed ? "Unfollow" : "Follow"}
                  </button>
                </div>

                <div className="result-row">
                  <div className="result-label">Email:</div>
                  <div className="result-value">{p.email}</div>
                </div>

                <div className="profile-stats">
                  <div className="stat-box">Followers: {p.followers}</div>
                  <div className="stat-box">Following: {p.followings}</div>
                  <div className="stat-box">
                    {p.has_followed ? "You follow" : "Not following"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;