// import React from 'react';

// function Error404() {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//       {/* Add error message or content */}
//     </div>
//   );
// }

// export default Error404;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Error404.css";
// import bearImage from "../../images/ErrorBear.png";

const parkFunFacts = [
  "Yellowstone was the world's first national park, established in 1872.",
  "The Great Smoky Mountains National Park is the most visited national park in the United States.",
  "The National Park Service manages over 400 sites, covering more than 84 million acres.",
  "Australia's Kakadu National Park has been inhabited by Indigenous people for more than 65,000 years.",
  "Kruger National Park in South Africa is one of the largest game reserves in Africa.",
];

function Error404() {
  const [funFact, setFunFact] = useState("");
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * parkFunFacts.length);
    setFunFact(parkFunFacts[randomIndex]);
  }, []);

  return (
    <div className="not-found-page-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <div className="not-found-handling">
        <h3>
          Sorry! That page doesn't seem to exist. Try going back to the home
          page.
        </h3>
      </div>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <button
          className="go-home-button"
          aria-label="Go back to the home page"
        >
          Go Back to Home Page
        </button>
      </NavLink>
      <div className="fun-fact-container" aria-label="Fun park fact">
        <h2 className="fun-fact-heading">
          Here's a park 🌲 fun fact to cheer you up:
        </h2>
        <p className="fun-fact">
          {funFact || "No fun facts available at the moment."}
        </p>
      </div>
      {/* <div className="image-container">
        <img src={bearImage} alt="Fun Bear" className="fun-bear-image" />
      </div> */}
    </div>
  );
}

export default Error404;
