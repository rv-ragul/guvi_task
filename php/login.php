<?php

$host = "localhost";
$mysqli = new mysqli($host, "admin", "Admin@12345", "guvi");
if ($mysqli->connect_error) {
    die('Connection error: ' . $mysqli->connect_error);
}

$redis = new Redis();
$redis->pconnect('127.0.0.1');

$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);
$response = array("message" => null, "success" => null);

try {
    $stmt = $mysqli->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows() == 1) {
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $response["message"] = "Login successfull";
            $response["success"] = true;
            $redis->set("session", hash("sha256", $username), 3600);
        } else {
            $response["message"] = "Invalid credentials";
            $response["success"] = false;
        }
    } else {
        $response["message"] = "User not found!";
        $response["success"] = false;
    }
    $stmt->close();
} catch (Exception $e) {
    $response["message"] = "Couldn't login..";
    $response["success"] = false;
}

header("Content-Type: application/json");
echo json_encode($response);
