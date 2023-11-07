// Import React hooks and components, API utility, and CSS styles
import React, { useState } from "react";
import { addContact } from "../api"; // API function to add a contact
import "./ContactForm.css";

// ContactForm functional component
const ContactForm = () => {
  // State for storing form data
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    birthDate: "",
    text: "",
  });

  // State for storing form errors
  const [errors, setErrors] = useState({});

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update formData with the new value for the named input
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // If an error exists for this field, clear it upon change
    if (errors[name]) {
      setErrors((prevState) => ({ ...prevState, [name]: undefined }));
    }
  };

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = getValidationErrors(formData);

    // If validation errors are found, update the errors state and stop the submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Begin form submission process, show spinner
    setIsSubmitting(true);

    // Add a delay to simulate network request
    setTimeout(async () => {
      try {
        // Attempt to submit the form data to the API
        const response = await addContact(formData);
        console.log("Form data submitted:", response.message);

        // After successful submission, hide spinner after a delay
        setTimeout(() => {
          setIsSubmitting(false);
          // TODO: Maybe show a success message or navigate to another page
        }, 2000); // Delay hiding the spinner for 2 seconds
      } catch (error) {
        // Handle submission errors
        console.error("Error submitting form:", error.message);
        setIsSubmitting(false); // Hide spinner on error
        // TODO: Display error message to user
      }
    }, 2000); // Delay before starting the form submission
  };

  // Validate form data
  const getValidationErrors = (data) => {
    const errors = {};
    // Perform validation checks for each field
    if (!data.name) errors.name = "Name is required.";
    if (!data.surname) errors.surname = "Surname is required.";
    if (!isValidPhoneNumber(data.phone)) errors.phone = "Invalid phone number.";
    if (!isValidDate(data.birthDate)) errors.birthDate = "Invalid date.";

    return errors;
  };

  // Check if phone number is valid
  function isValidPhoneNumber(phone) {
    const pattern = /^(?:\+30)?\d{10}$/;
    return pattern.test(phone);
  }

  // Check if date is valid
  function isValidDate(date) {
    const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(pattern);
    // Return false if pattern does not match
    if (!match) return false;

    // Extract year, month, and day from the matched result
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    // Current year for validation purposes
    const currentYear = new Date().getFullYear();

    // Perform year, month, and day validation
    if (year < 1900 || year > currentYear - 10) return false;
    if (month < 1 || month > 12) return false;

    // Array to determine days in each month, using 1-indexed months.
    // considering leap years for February
    const daysInMonth = [
      0,
      31,
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    // Check if day is within the valid range for the month
    if (day < 1 || day > daysInMonth[month]) return false;

    return true;
  }

  // JSX Render
  // Render the contact form
  return (
    <div className="page-content">
      <form onSubmit={handleFormSubmit}>
        <h2>Contact Form</h2>
        <div className="input-label">Name</div>
        <div className="input-wrapper">
          <img
            src="/assets/icons/user.png"
            alt="Name Icon"
            className="input-icon"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <div className="input-label">Surname</div>
        <div className="input-wrapper">
          <img
            src="/assets/icons/user.png"
            alt="Name Icon"
            className="input-icon"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Surname"
          />
        </div>
        {errors.surname && <p style={{ color: "red" }}>{errors.surname}</p>}

        <div className="input-label">Phone</div>
        <div className="input-wrapper">
          <img
            src="/assets/icons/telephone.png"
            alt="Name Icon"
            className="input-icon"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </div>
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <div className="input-label">Birth Date</div>
        <div className="input-wrapper">
          <img
            src="/assets/icons/date.png"
            alt="Name Icon"
            className="input-icon"
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            placeholder="Date of Birth"
          />
        </div>
        {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}

        <div className="input-label">Additional Information</div>
        <div className="input-wrapper">
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Additional Information"
          ></textarea>
        </div>

        {isSubmitting ? (
          <div className="spinner"></div>
        ) : (
          <button className="submit-button" type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
