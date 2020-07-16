//see books that they've added
//click on them to see details about them (reuse component)
//delete books from collecion
//edit extra information about it
//page num their on
//notes
import React from "react";
import LocalMethods from "../LocalStorageMethods.js";
import { useParams } from "react-router-dom";
import BookDetails from "../Components/BookDetails.js";
import EditableBook from "../Components/EditableBook.js";

export default function(props) {
  let params = useParams();
  let books, setBooks;
  let [viewingBook, setViewingBook] = React.useState(false);

  let collections = LocalMethods.GetCollections();
  let currentCollection = collections.find(element => element.id === params.id);

  try {
    [books, setBooks] = React.useState(currentCollection.books);
  } catch {
    window.location = "/";
  }

  let booksUI = books.map(book => {
    return (
      <EditableBook
        bookObj={book}
        volume={book.bookInfo}
        key={book.id}
        view={bookData => {
          setViewingBook(bookData);
        }}
        deleteMethod={() => {
          LocalMethods.deleteFromCollection(book.id, params.id);
          let collections = LocalMethods.GetCollections();
          let currentCollection = collections.find(
            element => element.id === params.id
          );

          setBooks(currentCollection.books);
        }}
        editMethod={(notesText, PageNum) => {
          LocalMethods.editFromCollection(
            book.id,
            params.id,
            notesText,
            PageNum
          );
          let collections = LocalMethods.GetCollections();
          let currentCollection = collections.find(
            element => element.id === params.id
          );

          setBooks(currentCollection.books);
        }}
      />
    );
  });

  if (!viewingBook) {
    return (
      <div className="flex flex-wrap w-full justify-center mt-4">{booksUI}</div>
    );
  } else {
    return (
      <BookDetails details={viewingBook} setViewingBook={setViewingBook} />
    );
  }
}
