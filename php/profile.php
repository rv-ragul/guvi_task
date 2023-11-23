<?php

require 'vendor/autoload.php';

$redis = new Redis();
$redis->pconnect('127.0.0.1');

$uri = "mongodb+srv://ragul542rv:ragul2023@cluster-guvi.pstcrrv.mongodb.net/users?retryWrites=true&w=majority";
$client = new MongoDB\Client($uri);
$profiles = $client->__get("users")->__get("profiles");

$update_data = function () use ($profiles) {
    $username = htmlspecialchars($_POST['username']);
    $realname = htmlspecialchars($_POST['realname']);
    $email = htmlspecialchars($_POST['email']);
    $dob = htmlspecialchars($_POST['dob']);
    $age = htmlspecialchars($_POST['age']);
    $contact = htmlspecialchars($_POST['contact']);

    $upsertResult = $profiles->updateOne(
        ['username' => $username],
        ['$set' => [
            'username' => $username,
            'realname' => $realname,
            'email' => $email,
            'dob' => $dob,
            'age' => $age,
            'contact' => $contact,
        ]],
        [
            'upsert' => true
        ]
    );
    echo $upsertResult->isAcknowledged();
    exit;
};

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        $value = $redis->get('session');
        if ($value == false) {
            header("HTTP/1.1 401 Unauthorized");
            header("Location: http://localhost:8000/login.html");
            exit;
        } else {
            header("Content-Type: application/json");
            echo json_encode($profiles->findOne(['username' => $_GET['username']]));
        }
        break;
    case "POST":
        $update_data();
}
