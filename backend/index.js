const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const transactionRoutes = require("./routes/transactionRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// ===========================
// Middlewares
// ===========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ===========================
// Static Files
// ===========================

app.use(express.static(path.join(__dirname, "public")));

// ===========================
// API Routes
// ===========================

app.use("/api/transactions", transactionRoutes);
app.use("/api/tasks", taskRoutes);

// ===========================
// Backend Status Page
// ===========================

app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Backend Status</title>

<style>

body{
font-family:Arial,sans-serif;
background:#f4f4f4;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.card{
background:#fff;
padding:40px;
border-radius:10px;
box-shadow:0 0 15px rgba(0,0,0,.15);
text-align:center;
width:420px;
}

h1{
color:green;
}

a{
display:inline-block;
margin-top:20px;
padding:10px 20px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:6px;
}

a:hover{
background:#1d4ed8;
}

</style>

</head>

<body>

<div class="card">

<h1>✅ Backend is Running</h1>

<p><b>Expense Tracker API</b></p>

<p>Status : Online 🟢</p>

<p>Version : 1.0.0</p>

<hr>

<h3>Available APIs</h3>

<p>GET /api/transactions</p>
<p>POST /api/transactions</p>
<p>PUT /api/transactions/:id</p>
<p>DELETE /api/transactions/:id</p>

<br>

<p>GET /api/tasks</p>
<p>POST /api/tasks</p>
<p>PUT /api/tasks/:id</p>
<p>DELETE /api/tasks/:id</p>

<hr>

<a href="/app">Open Expense Tracker</a>

</div>

</body>

</html>
`);

});

// ===========================
// Frontend
// ===========================

app.get("/app", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// ===========================
// 404 Handler
// ===========================

app.use((req, res) => {

    res.status(404).json({

        success: false,
        message: "Route Not Found"

    });

});

// ===========================
// Error Handler
// ===========================

app.use(errorHandler);

// ===========================
// Start Server
// ===========================

app.listen(PORT, () => {

    console.log(`🚀 Server Running on http://localhost:${PORT}`);

});