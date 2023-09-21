import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import { Link } from 'react-router-dom';

import '../Flashcard/Flashcard.css';

export default function FlashcardContainer({ flashcards, loading, categories, selectedCategory, setSelectedCategory, numberOfQuestions, setNumberOfQuestions, handleSubmit }) {
  return (
    <div className='container'>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

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
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  setNumberOfQuestions: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
