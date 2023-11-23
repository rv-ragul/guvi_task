<?php

$host = "localhost";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli($host, "admin", "Admin@12345", "guvi");
if ($mysqli->connect_error) {
    die('Connection error: ' . $mysqli->connect_error);
}

$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);
$response = array("message" => null, "success" => null);

try {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $mysqli->prepare("INSERT INTO users VALUES (?, ?)");
    $stmt->bind_param('ss', $username, $hashedPassword);
    $result = $stmt->execute();
    $stmt->close();
    if ($result == true) {
        $response["message"] = "User registered successfully!";
        $response["success"] = true;
    } else {
        $response["message"] = "Couldn't register User!";
        $response["success"] = false;
    }
} catch (Exception $e) {
    $response["message"] = "Username already exist!";
    $response["success"] = false;
}
header("Content-Type: application/json");
echo json_encode($response);
