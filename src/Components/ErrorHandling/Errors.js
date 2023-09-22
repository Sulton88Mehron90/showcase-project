import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Groundhog from '../../images/groundhog.png';
import './Errors.css';

function Errors({ error }) {
  return (
    <div className="error-msg">
      <h1>Oops! We're looking for it!</h1>
      {/* <img src={Groundhog} alt="Groundhog" /> */}
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <button className="go-home-button" aria-label="Go back to the home page">
          Go Back to Home Page
        </button>
      </NavLink>
      <h2>{error ? error.message : 'Something went wrong.'}</h2>
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
};

export default Errors;
