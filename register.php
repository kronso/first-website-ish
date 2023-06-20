<?php
    session_start()
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/user_access_form.css">
        <title>Kitype</title>
    </head>
    <body>
        <header class="header-main">
            <nav class="header-main-left">
                <ul>
                    <li>
                        <a href="index.php" id="logo">
                        <img src="img/keyboard-key-k.png" alt="logo">
                        kitype
                        </a>
                    </li>
                    <li><a href="leaderboard.php">leaderboard</a></li>
                    <li><a href="info.php">info</a></li>
                </ul>
            </nav>
            <nav class="header-main-right">
                <ul>
                    <li><a href="register.php">register</a></li>
                    <li><a href="login.php">login</a></li>
                </ul>
            </nav>  
        </header>
        <form class="user-access-wrapper" action="includes/register-inc.php" method="post">
            <label>register</label>
            <input type="text" name="username" placeholder="username">
            <input type="text" name="email" placeholder="email">
            <input type="password" name="pwd" placeholder="password">   
            <input type="password" name="pwd_repeat" placeholder="repeat-passowrd">
            <button type="submit">submit</button>
            <?php
                if (isset($_SESSION["register_error"])) {
            ?>
            <label for="user-access-wrapper" class="user-access-error"><?php echo $_SESSION["register_error"]; ?></label>
            <?php
                }
                session_destroy();
            ?>
        </form>
    </body>
</html>