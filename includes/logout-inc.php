<?php
// https://stackoverflow.com/questions/3512507/proper-way-to-logout-from-a-session-in-php
// Initialize the session.
session_start();

// Unset all of the session variables.
$_SESSION = array();

// Finally, destroy the session.
session_destroy();
header("location: ../index.php");
?>
