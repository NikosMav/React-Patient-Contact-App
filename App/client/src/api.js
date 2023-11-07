// Function to add a new contact to the backend
export const addContact = async (contact) => {
  // Send a POST request to the server with the contact data
  const response = await fetch(`/contacts`, {
    method: "POST", // Method type POST to send data
    headers: {
      "Content-Type": "application/json", // Indicate that we're sending JSON data
    },
    body: JSON.stringify(contact), // Convert the contact object to a JSON string
  });

  // Parse the JSON response from the server
  const data = await response.json();

  // If the server responds with a status code other than 200, throw an error
  if (response.status !== 200) {
    throw new Error(data.error); // The error message is extracted from the server's response
  }

  // If the response is successful, return the data from the server
  return data;
};

// Function to fetch the list of contacts from the backend
export const fetchContacts = async () => {
  // Send a GET request to the server to retrieve contacts
  const response = await fetch(`/contacts`); // By default, fetch uses GET method
  // Parse the JSON response into a JavaScript object
  const data = await response.json();

  // Return the contacts data to the caller
  return data;
};
