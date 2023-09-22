import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Error404.css";
import GreatMinds from "../../Images/avicenna.png";

const avicennaFunFacts = [
  "Avicenna's 'Canon of Medicine' was a top medical textbook for centuries in Europe and the Islamic world!",
  "Beyond medicine, Avicenna made significant contributions to astronomy, mathematics, and more!",
  "Avicenna is an ancestor of modern Tajiks and is celebrated for his vast knowledge.",
  "He crafted a unique argument proving God's existence, influencing thinkers globally.",
  "By age 10, Avicenna had memorized the entire Qur'an. Truly a prodigy!",
  "Avicenna loved switching subjects when stuck. Think of it as brain gymnastics!",
  "Did you know? The renowned scholar 'Avicenna' is a Latinized version of his real name: Abū ʿAlī al-Ḥusayn ibn ʿAbd Allāh ibn Sīnā. Quite a mouthful, isn't it?",
  "Avicenna, also known as Ibn Sina, was a Tajik polymath who left a lasting legacy in philosophy, medicine, and various other sciences. His work, The Canon of Medicine, was a medical reference in Europe and the Islamic world for centuries. Imagine landing on a 980 CE version of a 404 page - Avicenna might just have been the person to ask for directions!"
];

function Error404() {
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * avicennaFunFacts.length);
    setFunFact(avicennaFunFacts[randomIndex]);
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
      <NavLink to="/" className="error404-navlink" style={{ textDecoration: "none" }}>
        <button
          className="error404-go-home-button"
          aria-label="Go back to Home Page"
        >
          "Return to Home" or "Discover More"
        </button>
      </NavLink>

      <div className="fun-fact-container" aria-label="Fun park fact">
        <h2 className="fun-fact-heading">
          Ever heard of Avicenna, the scholar from 980 CE? <br />
          If you were lost back then, he might've been your guide on a 404 page like this!
        </h2>

        <p className="fun-fact">
          {funFact || "No fun facts available at the moment."}
        </p>
      </div>
      <div className="image-container">
        <img src={GreatMinds} alt="Ibn Sino" className="sino-image" />
      </div>
    </div>
  );
}

export default Error404;
