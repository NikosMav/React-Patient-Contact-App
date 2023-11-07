// Import necessary React modules and components
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

// Define the main App component
function App() {
  // State to keep track of the current page being displayed
  const [currentPage, setCurrentPage] = useState("");

  // Function to change the current page based on user interaction
  const changePage = (page) => {
    setCurrentPage(page); // Update the currentPage state to the new page
  };

  // Render the App component
  return (
    <div className="app-container">
      {/* Render the Navbar and pass the changePage function as a prop */}
      <Navbar changePage={changePage} />

      {/* Conditional rendering based on the current page */}
      {currentPage === "contact-form" && <ContactForm />}
      {currentPage === "contact-list" && <ContactList />}
    </div>
  );
}

export default App;
