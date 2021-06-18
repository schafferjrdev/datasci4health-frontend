import React from "react";
import { Header } from "components";
import Router from "pages/router";

function Main() {
  return (
    <>
      <Header />
      <main className="page-content">
        <Router />
      </main>
    </>
  );
}

export default Main;
