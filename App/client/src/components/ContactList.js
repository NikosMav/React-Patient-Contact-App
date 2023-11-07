// Importing necessary hooks from React and component styles
import React, { useEffect, useState } from "react";
import "./ContactList.css";

// ContactList functional component definition
const ContactList = () => {
  // State hook to store the array of contacts
  const [contacts, setContacts] = useState([]);

  // useEffect hook to perform side effects - in this case, fetching contacts data
  useEffect(() => {
    // Fetch contacts from the server's '/contacts' endpoint
    fetch("/contacts")
      .then((response) => response.json()) // Parsing the response as JSON
      .then((data) => setContacts(data)) // Setting the contacts data to state
      .catch((error) => console.error("Error fetching contacts:", error)); // Logging errors to the console
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  // Render the contact list UI
  return (
    <div className="contact-list-container">
      <h2>Contact List</h2>
      <ul>
        {/* Map over the contacts array and render each contact as a list item */}
        {contacts.map((contact) => (
          <li className="contact-item" key={contact.tsp}>
            {" "}
            {/* Key should be unique, assuming contact.id is unique */}
            <span className="contact-name">
              {contact.name} {contact.surname}
            </span>
            <span className="contact-phone">{contact.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
