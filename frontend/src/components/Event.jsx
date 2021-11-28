import React from "react";

function Event(props) {
  const id = props.match.params.id;

  return (
    <div>
      My id is {id}
    </div>
  );
}

export default Event;