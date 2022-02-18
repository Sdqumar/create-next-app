import React from "react";

export default function Connect({ onClick }) {
  return (
    <div>
      <h1>Connect your vehicle</h1>
      <button onClick={onClick}>Connect</button>
    </div>
  );
}
