<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();

    // The user can enter the email or password
    // in the name="username" input element
    $user_id = $_POST["user_id"];
    $pwd = $_POST["pwd"];

    include_once "../database/db-class.php";
    include_once "../database/login-class.php";

    $login = new Login($user_id, $pwd);

    $login->getUser();
    
    header("location: ../index.php");
}