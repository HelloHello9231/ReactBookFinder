import React from "react";
import localStorageMethods from "../LocalStorageMethods.js";
import Collection from "../Components/Collection.js";
import BGColors from "../Misc/Backgrounds.js";

export default function(props) {
  let [collections, setCollections] = React.useState(
    localStorageMethods.GetCollections()
  );
  let [collectionText, setText] = React.useState("");

  let bgIndex = -1;
  let collectionsUI = collections.map(collection => {
    bgIndex++;

    if (bgIndex > BGColors.length) bgIndex = 0;

    return (
      <Collection
        collection={collection}
        deleteMethod={id => {
          setCollections(localStorageMethods.delelteCollection(id));
        }}
        editMethod={(id, newText) => {
          setCollections(localStorageMethods.updateCollection(id, newText));
        }}
        key={collection.id}
        bgColor={BGColors[bgIndex]}
        nextColor={BGColors[bgIndex + 1 || 0]}
        history={props.history}
      />
    );
  });

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="text"
        placeholder="Create Collection"
        className="w-3/4 text-center rounded-sm sm:w-1/2 shadow-md py-1 px-2"
        onChange={event => {
          setText(event.target.value);
        }}
        value={collectionText}
        maxLength={25}
      />
      <button
        className="bg-blue-400 w-1/2 my-4 rounded text-gray-100 hover:bg-blue-600 sm:w-1/5 text-lg"
        onClick={() => {
          if (collectionText.length === 0 || collectionText.startsWith(" "))
            return;
          setCollections(localStorageMethods.createCollection(collectionText));
          setText("");
        }}
      >
        Create
      </button>
      <div className="flex flex-wrap w-3/4 h-auto  justify-center sm:w-5/6">
        {collectionsUI}
      </div>
    </div>
  );
}
