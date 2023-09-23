import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getTrivia, getCategories } from '../../ApiCalls';
import FlashcardContainer from '../FlashcardContainer/FlashcardContainer';
import HomePage from '../HomePage/HomePage';
import '../Flashcard/Flashcard.css'
import Error404 from '../ErrorHandling/Error404'
import Error500 from '../ErrorHandling/Error500'
import Errors from '../ErrorHandling/Errors';

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [triviaLoading, setTriviaLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching trivia categories:', error);
        if (error.message.includes('500')) {
          navigate('/500');
        } else if (error.message.includes('404')) {
          navigate('/404');
        } else {
          navigate('/error');
        }
      });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTriviaLoading(true);
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
        setTriviaLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching trivia questions:', error);
        setTriviaLoading(false);
        if (error.message === '500') {
          navigate('/500');
        } else if (error.message === '404') {
          navigate('/404');
        } else {
          navigate('/error');
        }
      });      
  };

  if (categoriesLoading || triviaLoading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/error" element={<Errors error={error} setError={setError} setTriviaLoading={setTriviaLoading} />} />
        <Route
          path="/flashcards"
          element={
            <FlashcardContainer
              flashcards={flashcards}
              loading={triviaLoading || categoriesLoading}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              numberOfQuestions={numberOfQuestions}
              setNumberOfQuestions={setNumberOfQuestions}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}  