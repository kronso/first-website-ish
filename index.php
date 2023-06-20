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
        <title>Kitype</title>
    </head>
    <body>
        <header class="header-main">
            <nav class="header-main-left">
                <ul>
                    <li><a href="index.php" id="logo">
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
        
        <div class="game-bar">
            <button type="button" class="falling-words-button">falling-words</button>
            <button type="button" class="type-racer-button">type-racer</button>
            <button type="button" class="walking-words-button">walking-words</button>
        </div>

        <div class="config-bar">
            <button type="button" id="config-spawn">spawn</button>
            <div id="config-spawn-content">
                <button type="button" class="config-spawn-button">3000</button>
                <button type="button" class="config-spawn-button">1500</button>
                <button type="button" class="config-spawn-button">1000</button>
                <button type="button" class="config-spawn-button">700</button>
            </div>

            <button type="button" id="config-difficulty">difficulty</button>
            <div id="config-difficulty-content">
                <button type="button" class="config-difficulty-button">easy</button>
                <button type="button" class="config-difficulty-button">hard</button>
            </div>

            <button type="button" id="config-timer">timer</button>
            <div id="config-timer-content">
                <button type="button" class="config-timer-button">15</button>
                <button type="button" class="config-timer-button">30</button>
                <button type="button" class="config-timer-button">60</button>
                <button type="button" class="config-timer-button">120</button>
            </div>

            <button type="button" id="config-speed">speed</button>
            <div id="config-speed-content">
                <button type="button" class="config-speed-button">0.5x</button>
                <button type="button" class="config-speed-button">1x</button>
                <button type="button" class="config-speed-button">2x</button>
                <button type="button" class="config-speed-button">4x</button>
            </div>

            <button type="button" id="config-lives">lives</button>
            <div id="config-lives-content">
                <button type="button" class="config-lives-button">3</button>
                <button type="button" class="config-lives-button">6</button>
                <button type="button" class="config-lives-button">9</button>
                <button type="button" class="config-lives-button">12</button>
            </div>
            <button type="button" id="config-words">words</button>
            <div id="config-words-content">
                <button type="button" class="config-words-button">15</button>
                <button type="button" class="config-words-button">30</button>
                <button type="button" class="config-words-button">50</button>
                <button type="button" class="config-words-button">100</button>
            </div>
            <button type="button" id="config-custom">custom</a>
        </div>

        <div class="big-wrapper">
            <p class="timer"></p>
            <div id="caps-lock-popup">
                Caps Lock  
                <img src="img/padlock.png"></img>
            </div>
            <div class="game-border"></div>
            <div class="type-racer"></div>
            <div class="game-grid"></div>
            <input type="text" class="user-input">
            <p class="lives"></p>    
        </div>

        <div class="game-data">
            <label for="gross-wpm">gross-wpm:</label><div class="gross-wpm"></div>
            <label for="net-wpm">net-wpm:</label><div class="net-wpm"></div>
            <label for="time-elapsed">time-elapsed:</label><div class="time-elapsed"></div>
            <label for="accuracy">accuracy:</label><div class="accuracy"></div>
        </div>  
        
        <!-- https://stackoverflow.com/questions/42675494/chrome-doesnt-recognize-my-changes-on-my-javascript-file-and-loads-old-code -->
        <script src="js/config.js?newversion"></script>
        <script type="module" src="js/main.js"></script>
    </body>
</html>
