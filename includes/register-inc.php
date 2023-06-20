<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    
    $username = $_POST["username"];
    $email = $_POST["email"];
    $pwd = $_POST["pwd"];
    $pwd_repeat = $_POST["pwd_repeat"];


    include_once "../database/db-class.php";
    include_once "../database/register-class.php";

    $register = new Register($username, $email, $pwd, $pwd_repeat);
    $register->insertUser();

    include_once "../database/config-class.php";

    $config = new Config(null);
    $config->setDefaultConfig();

    header("location: ../index.php");
}