<?php
    session_start();
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
        <link rel="stylesheet" href="css/leaderboard.css">
       
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
                    <?php
                        require_once "user-access-header.php";
                    ?>
                </ul>
            </nav>  
        </header>

        <div class="wrapper">
            <div class="leaderboard">
                <div class="top">
                    <div class="top-left">
                        <div class="title">Leaderboards</div>
                        <div class="buttons-left">
                            <label>#</label>
                            <label>name</label>
                            <button class="order">net</button>
                            <button class="order">gross</button>
                            <button class="order">accuracy</button>
                            <button class="order">games</button>
                        </div>
                    </div>
                    <div class="top-right"> 
                        <div class="select-leaderboard">
                            <button type="button">falling-words</button>
                            <button type="button">type-racer</button>
                            <button type="button">walking-words</button>
                        </div>
                        <div class="buttons-right">
                            <label>#</label>
                            <label>name</label>
                            <button class="order">net</button>
                            <button class="order">gross</button>
                            <button class="order">accuracy</button>
                            <button class="order">games</button>
                        </div>
                    </div>
                </div>

                <div class="main">
                    <div class="total-leaderboard"></div>
                    <div class="any-leaderboard"></div> 
                </div>
            </div>
        </div>
        <script src="js/leaderboard.js?newversion"></script>
    </body>
</html>