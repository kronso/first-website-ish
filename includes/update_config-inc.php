<?php
session_start();
// Ensures user is logged in to send data
if (!isset($_SESSION["username"]) || empty($_SESSION["username"])) {
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $config = json_decode(file_get_contents("php://input"), true);

    include_once "../database/db-class.php";
    include_once "../database/config-class.php";

    $config_handler = new Config(); 
    $config_handler->updateConfig($config);
}
