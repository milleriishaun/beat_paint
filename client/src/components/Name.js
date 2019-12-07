import React, { useState } from "react";

export default function Name() {
  const [name, setName] = useState("");
  console.log("hello from Name");
  // const audio = new Audio(
  //   "https://soundcloud.com/ravioliravioliravioli/bob-ross-theme-full"
  // );

  return (
    <label className="header-name">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
        placeholder="Untitled"
      />
    </label>
  );
}
