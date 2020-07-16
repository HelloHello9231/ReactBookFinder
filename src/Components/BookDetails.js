import React from "react";
import ReadMore from "./ReadMore.js";
import localMethods from "../LocalStorageMethods.js";

export default function(props) {
  let viewingBook = props.details;

  let authors = viewingBook.volumeInfo.authors;

  let collections = JSON.parse(localStorage.getItem("collections")) || [];
  let [selectedCategory, setCategory] = React.useState("none");

  let dropDownOptions = () => {
    if (collections.length === 0) return;
    return collections.map((collection, index) => {
      if (
        typeof collection.books.find(col => col.id === viewingBook.id) !==
        "undefined"
      )
        return;

      return (
        <option value={collection.id} key={collection.id}>
          {collection.name}
        </option>
      );
    });
  };

  let dropDown = () => {
    try {
      if (dropDownOptions().length === 0) return;
    } catch {
      return;
    }

    return (
      <>
        <select
          className="bg-blue-600 text-white rounded shadow-md w-1/2 self-center my-4 sm:py-1 px-2"
          value={selectedCategory}
          onChange={event => {
            setCategory(event.target.value);
          }}
        >
          <option value="none">Please choose a collection</option>
          {dropDownOptions()}
        </select>
        <button
          className="self-center bg-blue-400 hover:bg-blue-600 w-3/4 rounded my-4 sm:w-3/5 text-white"
          onClick={() => {
            if (selectedCategory === "none") return;

            localMethods.addToCollection(viewingBook, selectedCategory);
            setCategory("none");
          }}
        >
          Add To Collection
        </button>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center mt-4 justify-around"
      style={{ minHeight: "80vh", height: "auto" }}
    >
      <div
        className="w-10/12 sm:w-1/2 bg-white rounded-lg flex flex-col p-4 shadow-xl"
        style={{ minHeight: "70%", height: "auto" }}
      >
        <h3 className="text-blue-700 font-bold text-lg py-2">
          {viewingBook.volumeInfo.title}
        </h3>
        <ReadMore description={viewingBook.volumeInfo.description} />
        <h1 className="font-normal p-1">
          Author: <span className="font-bold">{authors.join(",")}</span>
        </h1>
        <h4 className="p-1">{viewingBook.volumeInfo.pageCount} pages</h4>
        <h4 className="p-1">Publisher {viewingBook.volumeInfo.publisher}</h4>
        <h4 className="p-1">
          Published At {viewingBook.volumeInfo.publishedDate}
        </h4>
        {dropDown()}
      </div>
      <button
        className="bg-blue-400 w-1/2 sm:w-1/4 rounded text-gray-100 hover:bg-blue-600 my-4"
        onClick={() => {
          props.setViewingBook(null);
        }}
      >
        Back
      </button>
    </div>
  );
}
