# Assignment Task

![image](https://user-images.githubusercontent.com/18698923/235904899-cf3d4893-38d5-4ffc-ba9b-32cade454833.png)

👋 Hello! Meet Dr Schmidt, a stressed-out senior cardiologist at P1 Generograd Medical Center. The patient inflow in the last few hours has been massive and his team had trouble organizing patient info and prioitizing cases. As the developer on site you suggest a simple React app to gather patient info and status before the patient has even entered the Medical Center. Dr Schmidt hastly agrees with your solution but the look on his face leaves you wondering whether he has understood the task at hand. In the ER's waiting room you yank out your laptop and start building a prototype.

**Tasks:**

1.  Build a "Contact Form" page that has the following five inputs: name, surname, phone, date of birth, and text.
2.  `Optional` Build a second page that displays all the contact form submissions that are stored in our backend (which we have provided)

# Generograd Medical Center Contact Management

This project is a simple React application designed to assist the medical staff at P1 Generograd Medical Center with managing patient information and prioritizing cases. It provides a streamlined way to gather patient info before they have entered the medical center.

## Features

- **Contact Form**: Allows the input of patient details such as name, surname, phone, date of birth, and additional text information.
- **Contact List**: Displays all the contact form submissions stored in the backend.
- **Field Validation**: Ensures the correctness of phone numbers and birth dates before submission.
- **Professional Design**: The application has a clean and professional look, tailored for medical staff usage.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/NikosMav/React-Patient-Contact-App
cd React-Patient-Contact-App
# Install dependencies for the server
npm install
# Install dependencies for the client
cd client
npm install
```

## Usage

To run the application:

```bash
# Start the backend server
npm start
# In another terminal, start the React development server
cd client
npm start
```

## Testing

The backend API can be tested using the following curl commands:

```bash
# Fetch all contact entries
curl -X GET localhost:8081/contacts

# Add a new contact entry
curl -X POST localhost:8081/contacts \
    -d '{"name":"John","surname":"Doe","phone":"+306971234567","birthDate":"1990-01-01","text":"Patient information"}' \
    -H 'Content-Type: application/json'
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Feel free to explore the Jupyter Notebook for a detailed step-by-step explanation of the project and its implementation.
