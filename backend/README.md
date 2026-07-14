# Expense Tracker

A simple Expense Tracker application built using Node.js, Express.js, HTML, CSS, and JavaScript.

## Features

- Add Transactions
- Update Transactions
- Delete Transactions
- View Transactions
- Add Tasks
- Update Tasks
- Delete Tasks
- File-based JSON Storage
- Logger Middleware
- Error Handling Middleware
- REST API
- Docker Support

## Technologies Used

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- Docker

## Project Structure

```
backend/
│── controllers/
│── routes/
│── middleware/
│── services/
│── data/
│── public/
│── Dockerfile
│── package.json
│── index.js
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

or

```bash
npm start
```

## API Endpoints

### Transactions

- GET `/api/transactions`
- POST `/api/transactions`
- PUT `/api/transactions/:id`
- DELETE `/api/transactions/:id`

### Tasks

- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Docker

Build Docker image:

```bash
docker build -t expense-tracker .
```

Run Docker container:

```bash
docker run -p 3000:3000 expense-tracker
```

## Author

Harshul