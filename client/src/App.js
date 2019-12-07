import Paint from "./components/Paint";
import Playground from "./Playground";
import React from "react";

export default function App() {
  return (
    <div>
      <Paint />
      <Playground />
      <audio autoplay="autoplay" controls>
        <source src="https://imgur.com/pXwvhFP.mp4" type="audio/mp4"></source>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
