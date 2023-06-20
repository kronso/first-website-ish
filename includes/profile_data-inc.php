<?php
session_start();

include_once "../database/db-class.php";
include_once "../database/data-class.php";

$data_handler = new Data(null); 

$data_handler->sendDataToClient();