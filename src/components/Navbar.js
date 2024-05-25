import React from "react";
import Logo from "../assets/penguin.png";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-1 gap-3" id="topNav">
        <div>
          <img
            src={Logo}
            alt="Avatar Logo"
            style={{ width: "100%", height: 40 }}
          />
        </div>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Question" className="nav-link" aria-current="page">
                Question
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Vocab" className="nav-link" aria-current="page">
                Vocab
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Test" className="nav-link" aria-current="page">
                Test
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Forum" className="nav-link" aria-current="page">
                Forum
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/User" className="nav-link" aria-current="page">
                User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
