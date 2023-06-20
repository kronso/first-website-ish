<?php
    if (isset($_SESSION["username"])) {
?>
    <li><a href="profile.php"><?php echo $_SESSION["username"]; ?></a></li>
    <li><a href="includes/logout-inc.php">logout</a></li>
<?php 
    } else {
?>
    <li><a href="register.php">register</a></li>
    <li><a href="login.php">login</a></li>
<?php
    }
?>