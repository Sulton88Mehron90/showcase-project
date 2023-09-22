import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';
import '../FlashcardContainer/FlashcardContainer.css';
import BrainImage from '../../Images/brain2.png';

export default function FlashcardContainer({ flashcards, loading, categories, selectedCategory, setSelectedCategory, numberOfQuestions, setNumberOfQuestions, handleSubmit }) {
  return (
    <div className='container' role="main">
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
          <label htmlFor="amount">Number of Questions (Max: 50)</label>
          <input
            type="number"
            id="amount"
            min="1"
            max="50"
            step="1"
            defaultValue={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            aria-describedby="amountHint"
          />
          <span id="amountHint" className="visually-hidden">Choose a number between 1 and 50.</span>
        </div>
        <div className="form-group">
          <button className="btn" aria-label="Generate flashcards based on selected category and number">Generate</button>
        </div>
      </form>
      <div className='card-grid' aria-live="polite">
        {flashcards.map(flashcard => {
          return <Flashcard flashcard={flashcard} key={flashcard.id} />;
        })}
        <Link to="/" className="button go-back-button" aria-label="Exit the trivia game and return to home">Exit The Game</Link>
        <img src={BrainImage} alt="Philosophical representation of a brain and face intertwining with a tree." role="presentation" />
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
