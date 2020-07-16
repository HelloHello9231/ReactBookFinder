import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  return (
    <button className="bg-blue-400 px-2 py-1 block rounded w-1/2 text-gray-200 hover:bg-blue-600 hover:text-gray-100 sm:w-1/4 sm:m-2">
      <Link to={props.link}>{props.content}</Link>
    </button>
  );
}
