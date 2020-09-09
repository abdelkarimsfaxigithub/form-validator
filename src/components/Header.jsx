import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-dark">
        <span id="title">Form validator</span>
        <div className="d-flex flex-row">
          <form className="form-inline ">
            <NavLink exact to="/">
              <button
                className="btn btn-outline-success menu-btn"
                type="button"
              >
                {" "}
                FormV1
              </button>
            </NavLink>

            <NavLink exact to="/v2">
              <button
                className="btn btn-outline-success menu-btn"
                type="button"
              >
                {" "}
                FormV2
              </button>
            </NavLink>
          </form>
        </div>
      </nav>
    </div>
  );
};
export default Header;
