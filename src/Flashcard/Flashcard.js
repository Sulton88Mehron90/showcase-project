import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';
import '../App/App.css';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  console.log("Flashcard object:", flashcard);  // dont forget to delete this console
  
  return (
    <div className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, index) => {
            return <div className='flashcard-option' key={`${flashcard.id}-${index}`}>{option}</div>
          })}
        </div>
      </div>
      <div className='back'>{flashcard.correctAnswer}</div>
    </div>
  )
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};
