import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import GreatMinds from '../../Images/greatminds.jpg'
import './Errors.css';

function Errors({ error, setTriviaLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log("Errors component rendered due to error");

      if (error.message.includes('500')) {
        navigate('/500');
      } else if (error.message.includes('404')) {
        navigate('/404');
      } else {
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

