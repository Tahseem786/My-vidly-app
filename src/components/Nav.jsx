import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const Nav = ({ user }) => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h3>Vidly</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movie">
                  Movie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Customer
                </Link>
              </li>
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-success">
                      {" "}
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        exact
                        to="/login"
                      >
                        Login
                      </Link>
                    </button>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Hello, {user.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-success">
                      {" "}
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        exact
                        to="/logout"
                      >
                        Logout
                      </Link>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
