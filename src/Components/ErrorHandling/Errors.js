import React from 'react'

export default function Errors() {
  return (
    <div>
      
    </div>
  )
}

// remove the TypeScript!!!!

// import "./ErrorComponent.css";
// import { NavLink } from "react-router-dom";
// import Groundhog from "../../images/groundhog.png";

// interface ErrorComponentProps {
//   error: {
//     message: string;
//     statusCode?: number;
//   } | null;
// }

// function ErrorComponent(props: ErrorComponentProps) {
//   const { error } = props;

//   return (
//     <div className="error-msg">
//       <h1>Oops! We're looking for it!</h1>
//       <img src={Groundhog} alt="Groundhog"></img>
//       <NavLink to="/" style={{ textDecoration: "none" }}>
//         <button
//           className="go-home-button"
//           aria-label="Go back to the home page"
//         >
//           Go Back to Home Page
//         </button>
//       </NavLink>
//       <h2>{error ? error.message : "Something went wrong."}</h2>
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

// export default ErrorComponent;
