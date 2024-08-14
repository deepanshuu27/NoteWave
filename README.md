This project is a full-featured web application built using Node.js, Express, and MongoDB, with EJS as the templating engine. The application includes user authentication, session management, and dynamic content rendering.

Key Features:
User Authentication: Implemented using Passport.js, providing secure login and session management.
Session Storage: Sessions are stored in MongoDB using connect-mongo, ensuring persistence across server restarts.
Templating Engine: EJS is used for dynamic rendering of HTML content, with layouts managed by express-ejs-layouts.
Method Override: Allows the use of HTTP verbs such as PUT or DELETE in places where the client doesn't support it.


Tech Stack:
Backend: Node.js, Express.js, MongoDB
Frontend: EJS, HTML, CSS
Authentication: Passport.js
Session Management: Express-Session, Connect-Mongo
Templating: Express-EJS-Layouts

Environment Setup:
Environment variables are managed using dotenv.
MongoDB connection is configured via an environment variable for flexibility.

Project Structure:
public/: Static files (CSS, JavaScript, images).
views/: EJS templates for rendering HTML.
servers/routes/: Routing files for authentication, index, and dashboard functionalities.
servers/config/db.js: Database connection configuration.


Error Handling:
A custom 404 page is provided for any unhandled routes.

How to Run Locally:
Clone the repository.
Install dependencies using npm install.
Set up environment variables in a .env file (e.g., MongoDB URI).
Start the MongoDB server if running locally.
Run the application with node app.js.
Access the application at http://localhost:5000.
