// import React, { useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import GreatMinds from '../../Images/greatminds.jpg'
// import './Errors.css';

// function Errors({ error, setTriviaLoading }) {
//   console.log("Received error:", error); // Log the entire error object
//   const navigate = useNavigate();
  
//   useEffect(() => {

//     function handleError(error) {

//       if (error.message.includes('500')) {
//         console.log("Handling 500 error"); // This will log if a 500 error is being handled
//         setError('500');
//         navigate('/500');
//       } else if (error.message.includes('404')) {
//         console.log("Handling 404 error"); // This will log if a 404 error is being handled
//         setError('404');
//         navigate('/404');
//       } else {
//         console.log("Handling other error"); // This will log if any other error is being handled
//         setError('Other');
//         navigate('/error');
//       }
//       setTriviaLoading(false);      
//     }

//     if (error) {
//       console.log("App component rendered");
//       handleError(error);
//     }
//   }, [error, setError, navigate, setTriviaLoading]);

//   return (
//     <div className="error-msg">
//       <h1>Oops! We're looking for it!</h1>
//       <img src={GreatMinds} alt="Grait Mind of 980 EC" />
//       <NavLink to="/" style={{ textDecoration: 'none' }}>
//         <button className="errors-go-home-button" aria-label="Go back to the home page">
//           Go Back to Home Page
//         </button>
//       </NavLink>
//       <h2 className="error-message">{error ? error.message : 'Something went wrong.'}</h2>
//       {error && error.statusCode && <p>Status Code: {error.statusCode}</p>}
//       {error && error.statusCode && (
//         <div className="error-info">
//           <p>Server Response Status: {error.statusCode}</p>
//           <p>Error Message: {error.message}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// Errors.propTypes = {
//   error: PropTypes.shape({
//     message: PropTypes.string,
//     statusCode: PropTypes.number,
//   }),
//   setError: PropTypes.func.isRequired,
//   setTriviaLoading: PropTypes.func.isRequired,
// };


// export default Errors;

import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import GreatMinds from '../../Images/greatminds.jpg'
import './Errors.css';

function Errors({ error, setTriviaLoading }) {
  console.log("Received error:", error); 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (error) {
      console.log("Errors component rendered due to error");
      
      if (error.message.includes('500')) {
        console.log("Navigating to 500 error page");
        navigate('/500');
      } else if (error.message.includes('404')) {
        console.log("Navigating to 404 error page");
        navigate('/404');
      } else {
        console.log("Navigating to general error page");
        navigate('/error');
      }

      setTriviaLoading(false);      
    }
  }, [error, navigate, setTriviaLoading]);

  return (
    <div className="error-msg">
      <h1>Oops! We're looking for it!</h1>
      <img src={GreatMinds} alt="Grait Mind of 980 EC" />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <button className="errors-go-home-button" aria-label="Go back to the home page">
          Go Back to Home Page
        </button>
      </NavLink>
      <h2 className="error-message">{error ? error.message : 'Something went wrong.'}</h2>
      {error && error.statusCode && <p>Status Code: {error.statusCode}</p>}
      {error && error.statusCode && (
        <div className="error-info">
          <p>Server Response Status: {error.statusCode}</p>
          <p>Error Message: {error.message}</p>
        </div>
      )}
    </div>
  );
}

Errors.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number,
  }),
  setTriviaLoading: PropTypes.func.isRequired,
};

export default Errors;

