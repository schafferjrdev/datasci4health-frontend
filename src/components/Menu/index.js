import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ currentPage, className, onClick }) => {
  return (
    <nav className={className}>
      <li className={currentPage === "/" ? "active" : ""}>
        <Link onClick={onClick} to="/">
          Introdução
        </Link>
      </li>
      <li className={currentPage === "/mapa" ? "active" : ""}>
        <Link onClick={onClick} to="/mapa">
          Mapa das anomalias
        </Link>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="http://datasus-app.herokuapp.com/"
        >
          Preditor
        </a>
      </li>
    </nav>
  );
};

export default Menu;
