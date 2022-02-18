import React from "react";

export default function Connect({ info }) {
  return (
    <div>
      <br />
      <div>
        <strong>Vehicle ID</strong>: <span>{info.id}</span>
      </div>
      <br />
      <div>
        <strong>Vehicle Make</strong>: <span>{info.make}</span>
      </div>
      <br />
      <div>
        <strong>Vehicle Model</strong>: <span>{info.model}</span>
      </div>
      <br />
      <div>
        <strong>Vehicle Year</strong>: <span>{info.year}</span>
      </div>
    </div>
  );
}
