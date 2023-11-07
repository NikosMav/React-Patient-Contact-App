import React from "react";
import "./Navbar.css";

// Navbar functional component with destructured props
// changePage function passed as a prop to switch between different views
const Navbar = ({ changePage }) => {
  // Return JSX for rendering the navigation bar
  return (
    // A div with the class 'navbar' to apply CSS styles
    <div className="navbar">
      {/* Button that, when clicked, calls the changePage function with the argument 'contact-form' */}
      <button onClick={() => changePage("contact-form")}>Contact Form</button>
      {/* Button that, when clicked, calls the changePage function with the argument 'contact-list' */}
      <button onClick={() => changePage("contact-list")}>Contact List</button>
    </div>
  );
};

export default Navbar;
