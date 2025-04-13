# CRUD Student Portal (Mobile Responsive)

A simple and responsive CRUD (Create, Read, Update, Delete) student portal built with vanilla HTML, CSS, and JavaScript on the frontend, and Node.js with MySQL on the backend. This project includes form validation to ensure data integrity.

## Table of Contents

- [CRUD Student Portal (Mobile Responsive)](#crud-student-portal-mobile-responsive)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
    - [Running the Frontend](#running-the-frontend)
    - [Running the Backend](#running-the-backend)
  - [Form Validation](#form-validation)
  - [Mobile Responsiveness](#mobile-responsiveness)

## Features

- **Create:** Add new student records to the database.
- **Read:** View a list of all students and their details.
- **Update:** Modify existing student information.
- **Delete:** Remove student records from the database.
- **Form Validation:** Client-side validation for input fields to ensure data accuracy.
- **Mobile Responsive:** Designed to work seamlessly on various screen sizes.

## Technologies Used

**Frontend:**

- HTML
- CSS
- JavaScript
- [Vite](https://vitejs.dev/) (for development server and build process)

**Backend:**

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/download/) (version >= 16 recommended)
- [npm](https://www.npmjs.com/) (usually installed with Node.js) or [yarn](https://yarnpkg.com/)
- [MySQL](https://dev.mysql.com/downloads/)

## Installation

Follow these steps to get the project running on your local machine.

### Frontend

1. Clone the repository

   ```bash
   git clone https://github.com/chachaa10/student-crud.git

   cd student-crud
   ```

2. Navigate to the frontend directory in your project:

   ```bash
   cd frontend
   ```

3. Install the frontend dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

### Backend

1.  Navigate to the backend directory in your project:

    ```bash
    cd server
    ```

2.  Install the backend dependencies using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure MySQL:**

    - Ensure your MySQL server is running.
    - Create a database for the student portal (e.g., `studentportal`).
    - Create a `.env` file in the backend directory and add your MySQL connection details:

      ```env
      DB_HOST=localhost
      DB_USER=your_mysql_username
      DB_PASSWORD=your_mysql_password
      DB_DATABASE=studentportal
      ```

4.  **Run Database Migrations/Setup (if applicable):**

    ```bash
    mysql -u your_mysql_username -p studentportal < schema.sql
    ```

    Or, if you're using an ORM or custom scripts, follow the instructions in your backend documentation.

## Project Structure

```bash
student-crud/
├── frontend/
│   ├── index.html         (Login Page)
│   ├── register.html      (Create Account)
│   ├── dashboard.html     (Student Information)
│   ├── admin.html         (Admin Page | Student List)
│   ├── css/
│   │   └── default.css (CSS Reset && based styles)
│   │   └── index.css
│   │   └── register.css
│   │   └── dashboard.css
│   │   └── admin.css
│   ├── js/
│   │   ├── index.js
│   │   └── register.js
│   │   └── dashboard.js
│   │   └── admin.js
│   ├── public/             (Icons)
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
└── server/
    ├── app.js           (Main backend server file)
    ├── routes/
    │   └── students.js     (API routes for student data)
    ├── config/
    │   └── db.js             (Database connection setup)
    ├── .env                  (Backend environment variables - database credentials, ports, etc.)
    ├── package.json
    ├── package-lock.json
    └── README.md
├── .gitignore
└── README.md               (Project-level README)
```

## Usage

### Running the Frontend

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Start the Vite development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will likely start the frontend on `http://localhost:5173/` (or a similar port).

### Running the Backend

1.  Navigate to the backend directory:

    ```bash
    cd server
    ```

2.  Start the Node.js server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Your backend server will likely run on a specified port (e.g., `http://localhost:3001`). Check your backend code for the exact port.

3.  Open your web browser and navigate to the frontend URL to interact with the student portal. Ensure your backend server is running for the frontend to communicate with the database.

## Form Validation

The frontend includes JavaScript-based form validation to ensure that user input meets certain criteria before being submitted to the backend. This helps to prevent invalid data from being stored in the database. The validation likely covers aspects such as:

- Required fields
- Data type checks
- Format validation (e.g., email format)

Refer to the frontend JavaScript files for the specific validation rules implemented.

## Mobile Responsiveness

The user interface is designed to be responsive and adapt to different screen sizes, including desktops, tablets, and mobile phones. This is achieved through the use of CSS media queries and a flexible layout. Open the application on different devices or use your browser's developer tools to simulate various screen sizes to see the responsive design in action.
