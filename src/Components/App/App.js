import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FlashcardContainer from '../FlashcardContainer/FlashcardContainer';
import HomePage from '../HomePage/HomePage';
import { getTrivia, getCategories } from '../../ApiCalls';
import '../Flashcard/Flashcard.css'

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    getTrivia(numberOfQuestions, selectedCategory)
      .then(data => {
        const formattedQuestions = data.results.map((rawQuestion, index) => {
          const decodedQuestion = decodeURIComponent(rawQuestion.question);
          const decodedCorrectAnswer = decodeURIComponent(rawQuestion.correct_answer);
          const decodedIncorrectAnswers = rawQuestion.incorrect_answers.map(decodeURIComponent);
  
          return {
            id: `${index}-${Date.now()}`,
            question: decodedQuestion,
            correctAnswer: decodedCorrectAnswer,
            options: [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(() => Math.random() - 0.5),
          };
        });
        setFlashcards(formattedQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching trivia questions:', error);
      });
  }, []);
  

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('There was an error fetching trivia categories:', error);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getTrivia(numberOfQuestions, selectedCategory)
      .then(data => {
        const formattedQuestions = data.results.map((rawQuestion, index) => {
          const decodedQuestion = decodeURIComponent(rawQuestion.question);
          const decodedCorrectAnswer = decodeURIComponent(rawQuestion.correct_answer);
          const decodedIncorrectAnswers = rawQuestion.incorrect_answers.map(decodeURIComponent);
  
          return {
            id: `${index}-${Date.now()}`,
            question: decodedQuestion,
            correctAnswer: decodedCorrectAnswer,
            options: [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(() => Math.random() - 0.5)
          };
        });
        setFlashcards(formattedQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching trivia questions:', error);
      });
  };  

  function handleError(error) {
    if (error.message === '500') {
      setError('500');
    } else if (error.message === '404') {
      setError('404');
    } else {
      setError('Other');
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/flashcards" 
          element={
            <FlashcardContainer 
              flashcards={flashcards} 
              loading={loading}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              numberOfQuestions={numberOfQuestions}
              setNumberOfQuestions={setNumberOfQuestions}
              handleSubmit={handleSubmit}
            /> 
          }
        />
      </Routes>
    </div>
  );
}

