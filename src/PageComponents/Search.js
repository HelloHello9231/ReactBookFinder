import React from "react";
import APIMethods from "../APIMethods.js";
import Book from "../Components/Book.js";
import BookDetails from "../Components/BookDetails.js";

export default function(props) {
  let [results, changeResults] = React.useState([]);
  let [viewingBook, setViewingBook] = React.useState(false);

  function changeInputState(event) {
    if (event.which === 13 && event.target.value.length > 0) {
      getResults(event.target.value);
    }
  }

  async function getResults(keyword) {
    let books = await APIMethods.searchBooks(keyword);

    if (books.totalItems === 0 || books.hasOwnProperty("error"))
      return alert("Couldn't find anything");

    changeResults(books.items);
  }

  function viewBook(bookData) {
    setViewingBook(bookData);
  }

  let books;
  if (results.length > 0) {
    books = results.map((book, index) => {
      return <Book data={book} key={index} view={viewBook} />;
    });
  }

  if (!viewingBook) {
    return (
      <div className="flex flex-col items-center mt-4">
        <input
          type="search"
          placeholder="Book Search"
          className="w-3/4 text-center rounded-sm sm:w-1/2 shadow-md py-1 px-2"
          onKeyPress={changeInputState}
        />
        <div className="flex flex-wrap w-full justify-center mt-4">{books}</div>
      </div>
    );
  } else {
    return (
      <BookDetails details={viewingBook} setViewingBook={setViewingBook} />
    );
  }
}
