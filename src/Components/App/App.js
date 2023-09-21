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

//   return (
//     <div>
//       <form className="header" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             {categories.map(category => {
//               return <option value={category.id} key={category.id}>{category.name}</option>
//             })}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="amount">Number of Questions</label>
//           <input type="number" id="amount" min="1" step="1" defaultValue={10} onChange={(e) => setNumberOfQuestions(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <button className="btn">Generate</button>
//         </div>
//       </form>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/flashcards" element={loading ? <div>Loading...</div> : <FlashcardContainer flashcards={flashcards} />} />
//       </Routes>
//     </div>
//   );
// }

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

