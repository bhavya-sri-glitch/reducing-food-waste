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
    $shop_name = $_POST['shop_name'];
    $name = $_POST['name'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Secure password hashing
   
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $dob = $_POST['dob'];
    $shop_address = $_POST['shop_address'];

    // Prepare and execute SQL query
    $sql = "INSERT INTO wholesale (shop_name, name, password, email, mobile, dob, shop_address)
            VALUES ('$shop_name', '$name', '$password', '$email', '$mobile', '$dob', '$shop_address')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registration successful! Redirecting to login page...');</script>";
        echo "<script>window.location.href = 'restafterlr.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
