// import React, { useState } from 'react';
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import './Flashcard.css';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])


  console.log("Flashcard object:", flashcard);  // dont forget to delete this console
  
  return (
    <div className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      {/* <div className='front'> */}
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, index) => {
            return <div className='flashcard-option' key={`${flashcard.id}-${index}`}>{option}</div>
          })}
        </div>
      </div>
      {/* <div className="back" ref={backEl}>{flashcard.correctAnswer}</div> */}
      {/* <div className='back'>{flashcard.correctAnswer}</div> */}
      <div className="back" ref={backEl}>
        {flip && (
          <span className="correct-answer-emoji" role="img" aria-label="Correct Answer">🌱</span>
        )}
        {flashcard.correctAnswer}
      </div>
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
