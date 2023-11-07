// Importing required modules
import express from "express";
import dotenv from "dotenv";
import path from "path";

// --------------------//
// Globals and Configs //
// --------------------//

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // Notice express.json middleware

// Load environment variables from .env file
dotenv.config();

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../client/build")));

// ----------------------//
// Fake Data and mock db //
// ----------------------//

// Type definition for contact information
type ContactInfo = {
  name: string;
  surname: string;
  phone: string;
  birthDate: string;
  text: string;
  tsp: number;
};

// Mock database: an in-memory array to store contact data
const database: ContactInfo[] = [
  {
    name: "Jerry",
    surname: "Smith",
    phone: "+306973334477",
    birthDate: "1982-04-20",
    text: "Doc, I need help, Rick turned me into a big snail, I am typing with my tongue",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Space Beth",
    surname: "Sanchez",
    phone: "+306972229966",
    birthDate: "1982-11-19",
    text: "I found Summer injured, we need help ASAP",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Beth",
    surname: "Smith",
    phone: "+306972229977",
    birthDate: "1982-11-19",
    text: "I just want a regular check-up",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Morty",
    surname: "Smith",
    phone: "+306971119977",
    birthDate: "2009-05-17",
    text: "Doc, I need phsycological support, I cannot handle the crazy Rick adventures!!!",
    tsp: 1680964502417,
  } as ContactInfo,
];

// ------------------------------------//
// Minimalistic API for take home task //
// ------------------------------------//

// Endpoint to add a contact to the mock database
app.post("/contacts", (req, res) => {
  const data = req.body;

  // Validate incoming data
  const isValidData = simpleValidateContactInfo(data);

  // If data is not valid, return error response
  if (!isValidData) {
    return res
      .status(400)
      .json({ error: "Input data is not valid ContactInfo" });
  }

  // Add data to mock database
  database.push({ ...data, tsp: Date.now() } as ContactInfo);

  // Send success response
  res.send({ message: "Contact added successfully" });
});

// Endpoint to get all contacts from the mock database
app.get("/contacts", (req, res) => {
  res.send(database);
});

// Fallback route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start the Express server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});

// ------//
// utils //
// ------//

// Function to validate the structure of contact data
function simpleValidateContactInfo(data: any): data is ContactInfo {
  // Check if data is an object
  if (!data || typeof data !== "object") {
    return false;
  }

  // Required fields for validation
  const requiredFields: (keyof ContactInfo)[] = [
    "name",
    "surname",
    "phone",
    "birthDate",
    "text",
  ];

  // Check the presence and type of required fields
  for (const field of requiredFields) {
    if (typeof data[field] !== "string") {
      return false;
    }
  }

  return true;
}
