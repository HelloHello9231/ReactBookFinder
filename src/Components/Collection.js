import React from "react";
export default function(props) {
  let info = props.collection;
  let [beingEdited, setEdited] = React.useState(false);
  let [editedText, setEditedText] = React.useState(info.name);

  if (!beingEdited) {
    return (
      <div
        className={`w-48 h-48 ${
          props.bgColor
        } mx-4 my-2 flex flex-col items-center rounded-lg justify-around cursor-pointer hover:${
          props.nextColor
        }`}
        onClick={e => {
          if (e.target.tagName !== "BUTTON") {
            props.history.push(`/CollectionDetails/${info.id}`);
          }
        }}
      >
        <h1 className="text-lg text-white  p-2 text-center break-words w-full break-all">
          {info.name}
        </h1>
        <div className="flex w-full justify-around ">
          <button
            className="bg-orange-500 w-1/3 rounded text-black shadow-md font-normal"
            onClick={() => {
              props.deleteMethod(info.id);
            }}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 w-1/3 rounded text-black shadow-md font-normal"
            onClick={() => {
              setEdited(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`w-48 h-48 ${
          props.bgColor
        } mx-4 my-2 flex flex-col items-center rounded-lg justify-around`}
      >
        <input
          type="text"
          defaultValue={info.name}
          className="w-3/4 text-center rounded-sm shadow-md "
          onInput={event => {
            setEditedText(event.target.value);
          }}
          maxLength={25}
        />
        <button
          className="bg-yellow-500 w-3/4 rounded text-black shadow-md font-normal"
          onClick={() => {
            setEdited(false);
            props.editMethod(info.id, editedText);
          }}
        >
          Finish
        </button>
      </div>
    );
  }
}
