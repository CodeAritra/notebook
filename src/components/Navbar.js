import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Notebook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/about">
                About
              </a>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <a className="btn btn-primary mx-2" href="/Login" role="button">
                Login
              </a>
              <a className="btn btn-primary mx-2" href="/Signup" role="button">
                SignUp
              </a>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handlelogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
