import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults } from "../redux/actions";

export function SideBar({ onTrackSelect }) {
  const favorites = useSelector((state) => state.favorites.content);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submit triggered, query:", searchQuery);
    if (searchQuery.trim()) {
      dispatch(getSearchResults(searchQuery)); // Lancia l'azione di ricerca
    }
  };

  return (
    <aside className="col col-2">
      <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
        <div className="container flex-column align-items-start">
          <a className="navbar-brand" href="index.html">
            <img src="assets/logo/logo.png" alt="Spotify Logo" width="131" height="40" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="">
                    <i className="bi bi-house-door-fill"></i>&nbsp; Home
                  </a>
                </li>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="">
                    <i className="bi bi-book-fill"></i>&nbsp; Your Library
                  </a>
                </li>
                <li>
                  <form className="input-group mt-3" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                        GO
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav-fav">
          <div className="favorites-section mt-3">
            <h5 className="text-white fw-bold">Your Favorites</h5>
            <ul className="list-unstyled">
              {favorites.length > 0 ? (
                favorites.map((track) => (
                  <li key={track._id} className="mb-2">
                    <a
                      className=""
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        onTrackSelect(track);
                      }}
                    >
                      {track.title.slice(0, 30)}
                    </a>
                  </li>
                ))
              ) : (
                <li>No favorites yet</li>
              )}
            </ul>
          </div>
        </div>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">Sign Up</button>
          <button className="btn login-btn" type="button">Login</button>
          <div>
            <a href="#">Cookie Policy</a> | <a href="#">Privacy</a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
