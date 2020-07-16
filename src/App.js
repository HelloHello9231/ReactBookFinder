import React from "react";
import "./styles.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LinkButton from "./Components/LinkButton.js";
import Search from "./PageComponents/Search.js";
import Collections from "./PageComponents/Collections.js";
import CollectionDetails from "./PageComponents/CollectionDetails.js";
import PageNotFound from "./PageComponents/404.js";

export default function App() {
  return (
    <div className="bg-gray-200 min-h-screen h-auto w-full">
      <Router>
        <div className="flex flex-col w-full h-24 items-center justify-around sm:flex-row sm:justify-center">
          <LinkButton content="Search" link="/" />
          <LinkButton content="My Collections" link="/collections" />
        </div>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/Collections" component={Collections} />
          <Route path="/CollectionDetails/:id" component={CollectionDetails} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
