import React from 'react';
import { Link } from 'react-router-dom';
// import ibnSinoImage from '../../Images/ibnSino.png';
import ibnSinoImage from '../../Images/ibnSino2.png';
import './HomePage.css';

const HomePage = () => (
  <div className="container">
    <h1>Avicenna Method!</h1>

    <div className="img-container">
      <img src={ibnSinoImage} alt="Ibn Sino" />
    </div>

    <h2>Why the Avicenna Method as a Brain Relaxer?</h2>
    <p>
      This app is inspired by one of my countrymen, Avicenna, and his method of switching from one subject to another when he felt tired or stuck. It's a great way to take a break while still engaging your brain!
    </p>
    <Link to="/flashcards" className="goBackButton">Flashcards Game</Link>
    <a href="https://en.wikipedia.org/wiki/Avicenna" target="_blank" rel="noopener noreferrer" className="button">Learn More About Avicenna</a>
    <p>
      On a separate note, I used flashcards to entertain my grandson during long-distance video calls in the COVID era. Flashcards can be a versatile and engaging tool for all ages.
      <a href="https://youtu.be/qi4ZWeD4bLk?si=peLVf6tN1-ShiaPy" target="_blank" rel="noopener noreferrer">For a fun video, check out our entertaining flashcard session on YouTube, featuring Pamiri song audio in the background. Be warned – it could be loud!</a>
    </p>
  </div>
);

export default HomePage;
