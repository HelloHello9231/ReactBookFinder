import React from "react";
import Book from "./Book.js";

export default function(props) {
  let [beingEdited, setEdited] = React.useState(false);
  let [notes, setNotes] = React.useState(props.bookObj.Notes);
  let [pageNum, setPageNum] = React.useState(props.bookObj.PageNum);

  if (beingEdited) {
    return (
      <Book data={props.volume} view={props.view} isBeingEdited={true}>
        <div className="flex flex-col items-center ">
          <textarea
            value={notes}
            cols={14}
            rows={6}
            className="bg-blue-400 text-white"
            onChange={e => {
              setNotes(e.target.value);
            }}
          />
          <input
            type="number"
            value={pageNum}
            className="w-5/6 mt-2 bg-blue-200 text-black rounded text-center"
            onChange={e => {
              setPageNum(e.target.value);
            }}
          />
          <button
            className="my-2 w-1/2 bg-blue-600 hover:bg-blue-800 text-white rounded"
            onClick={() => {
              props.editMethod(notes, pageNum);
              setEdited(false);
            }}
          >
            Finish
          </button>
        </div>
      </Book>
    );
  } else {
    return (
      <Book data={props.volume} view={props.view}>
        <div className="flex justify-around">
          <button
            className="bg-blue-400 hover:bg-blue-600 w-1/3 m-2 rounded text-gray-100"
            onClick={() => {
              setEdited(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 w-1/2 m-2 rounded text-gray-100 py-1 "
            onClick={() => {
              props.deleteMethod(notes, pageNum);
            }}
          >
            Delete
          </button>
        </div>
      </Book>
    );
  }
}
