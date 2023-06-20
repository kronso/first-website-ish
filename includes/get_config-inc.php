<?php
session_start();
// Ensures user is logged in to send data
if (!isset($_SESSION["username"]) || empty($_SESSION["username"])) {
    echo json_encode([
        "spawn" => 1500,
        "difficulty" => "easy",
        "timer" => 30,
        "speed" => 0.5,
        "lives" => 3,
        "words" => 15,
    ]);
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include_once "../database/db-class.php";
    include_once "../database/config-class.php";

    $config_handler = new Config(); 
    $config_handler->sendConfigToClient();
}

