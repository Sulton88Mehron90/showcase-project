import React, { useState, useEffect } from 'react';
import FlashcardContainer from '../FlashcardContainer/FlashcardContainer';
import { getTrivia } from '../ApiCalls';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrivia()
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
        console.log(formattedQuestions);  //console.log dont forget to remove
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching trivia questions:', error);
      });
  }, []);
  

  return (
      loading ? <div>Loading...</div> : <FlashcardContainer flashcards={flashcards} />
  );
}

export default App;