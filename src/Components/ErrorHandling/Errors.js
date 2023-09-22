import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import GreatMinds from '../../Images/greatminds.jpg'
import './Errors.css';

function Errors({ error, setError, setTriviaLoading }) {
  const navigate = useNavigate();

  function handleError(error) {
    if (error.message === '500') {
      setError('500');
    } else if (error.message === '404') {
      setError('404');
    } else {
      setError('Other');
    }
    setTriviaLoading(false);
    navigate('/error');
  }

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

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
  setError: PropTypes.func.isRequired,
  setTriviaLoading: PropTypes.func.isRequired,
};


export default Errors;
