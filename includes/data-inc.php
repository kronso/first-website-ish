<?php
session_start();
// Ensures user is logged in to send data
if (!isset($_SESSION["username"]) || empty($_SESSION["username"])) {
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    include_once "../database/db-class.php";
    include_once "../database/data-class.php";

    $data_handler = new Data($data);
    $data_handler->insertData();
    // Updates users average_combined_data after finishing a game.
    $data_handler->sendCombinedAverageData();
    $data_handler->sendGameAverageData();
}

