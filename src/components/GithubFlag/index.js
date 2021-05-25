import React from "react";
import github_icon from "assets/github_icon.png";

const GithubFlag = ({ desktop }) => {
  return (
    <div className={`github-link ${desktop && "desktop"}`}>
      <div className="github-flag"></div>
      <a
        href="https://github.com/math-sasso/data_science_for_health_unicamp"
        target="_blank"
        rel="noreferrer"
        className="github-icon"
      >
        <img src={github_icon} alt="github logo" />
      </a>
    </div>
  );
};

export default GithubFlag;
