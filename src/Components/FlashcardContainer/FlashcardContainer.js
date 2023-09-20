import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import { Link } from 'react-router-dom'
import '../Flashcard/Flashcard.css'

// export default function FlashcardContainer({ flashcards }) {
//   return (
//     <div className='card-grid'>
//       {flashcards.map(flashcard => {
//         return <Flashcard flashcard={flashcard} key={flashcard.id} />;
//       })}
//       <Link to="/" className="button">Go Back</Link>
//     </div>
//   );
// }


export default function FlashcardContainer({ flashcards }) {
  return (
    <div className='container'>
      <div className='card-grid'>
        {flashcards.map(flashcard => {
          return <Flashcard flashcard={flashcard} key={flashcard.id} />;
        })}
        <Link to="/" className="button">Go Back</Link>
      </div>
    </div>
  );
}

FlashcardContainer.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      correctAnswer: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};
