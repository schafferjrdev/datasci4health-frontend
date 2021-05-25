import React from "react";
import { Header } from "components";
import Router from "pages/router";

function Main() {
  return (
    <div>
      <Header />
      <section className="page-content">
        <Router />
      </section>
    </div>
  );
}

export default Main;
