<?php
session_start();

include_once "../database/db-class.php";
include_once "../database/data-class.php";

$cfg = json_decode(file_get_contents("php://input"), true);

$data_handler = new Data(null); 
$data_handler->sendLeaderboardDataToClient($cfg);
