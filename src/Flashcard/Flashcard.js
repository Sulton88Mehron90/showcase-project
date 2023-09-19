import React from 'react';
import { useState } from 'react';
import './Flashcard.css';
import '../App/App.css';

// export default function Flashcard({ flashcard }) {
//   const[flip, setFlip] = useState(false)
//   return (
//     <div className={`card ${flip ? 'flip' : ''}`}
//       onClick={() => setFlip(!flip)}
//     >
//     <div className='front'>
//       {flashcard.question}
//       <div className='flashcard-options'>
//         {flashcard.options.map(option => {
//           return <div className='flashcard-option'>{option}</div>
//         })}
//       </div>
//     </div>
//     <div className='back'>{flashcard.answer}</div>
//     </div>
//   )
// }


export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  
  return (
    <div className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, index) => {
            return <div className='flashcard-option' key={index}>{option}</div>
          })}
        </div>
      </div>
      <div className='back'>{flashcard.answer}</div>
    </div>
  )
}
