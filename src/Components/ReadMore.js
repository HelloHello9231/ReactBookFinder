import React from "react";

export default function(props) {
  let [showMore, setShowAmount] = React.useState(false);

  if (!showMore) {
    return (
      <div>
        <p className="h-48 overflow-hidden italic">{props.description}</p>
        <h3
          className="underlined text-blue-400 cursor-pointer"
          onClick={() => {
            setShowAmount(true);
          }}
        >
          Show More
        </h3>
      </div>
    );
  } else {
    return (
      <div>
        <p className="h-auto italic">{props.description}</p>
        <h3
          className="underlined text-blue-400 cursor-pointer"
          onClick={() => {
            setShowAmount(false);
          }}
        >
          Show Less
        </h3>
      </div>
    );
  }
}
