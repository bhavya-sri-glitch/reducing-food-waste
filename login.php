<?php
// Start session to track user login state
session_start();

// Database connection (replace with your database details)
$servername = "localhost";
$username = "root";
$password = "";
$database = "grocery_network";

$conn = new mysqli($servername, $username, $password, $database);

// Check database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query to check if the user exists
    $sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Login successful
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $email;

        // Redirect to the dashboard or homepage
        header("Location: restafterlr.html");
        exit();
    } else {
        // Login failed: Redirect back to login.html with an error parameter
        header("Location: login.html?error=invalid");
        exit();
    }

    $stmt->close();
}

$conn->close();
?>
