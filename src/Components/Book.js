import React from "react";

export default function(props) {
  let book = props.data;

  if (typeof book.volumeInfo.imageLinks === "undefined") {
    return <div />;
  }

  let bookTitle = (
    <h1 className="h-24 text-center break-words overflow-hidden p-4 ">
      {book.volumeInfo.title}
    </h1>
  );

  if (props.isBeingEdited) {
    bookTitle = <div />;
  }

  return (
    <>
      <div
        className="w-32 h-auto bg-white m-4 shadow-xl rounded cursor-move hover:bg-gray-200 hover:scale-50"
        onClick={e => {
          if (e.target.tagName !== "BUTTON")
            if (!props.isBeingEdited) props.view(book);
        }}
      >
        <img
          src={
            book.volumeInfo.imageLinks.thumbnail ||
            book.volumeInfo.imageLinks.smallThumbnail
          }
          alt="book cover"
          className="h-48 w-full object-cover object-center"
        />
        {bookTitle}
        {props.children}
      </div>
    </>
  );
}
