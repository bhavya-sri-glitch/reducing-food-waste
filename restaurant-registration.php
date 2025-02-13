<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "grocery_network";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $restaurant_name = $_POST['restaurant_name'];
    $mobile = $_POST['mobile'];
    $address = $_POST['address'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Secure password hashing
    $email = $_POST['email'];
    $dob = $_POST['dob'];

    // Insert the registration data
    $sql = "INSERT INTO restaurants (restaurant_name, mobile, address, password, email, dob)
            VALUES ('$restaurant_name', '$mobile', '$address', '$password', '$email', '$dob')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registration successful! Redirecting to the dashboard...');</script>";
        echo "<script>window.location.href = 'restaurant-dashboard.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
