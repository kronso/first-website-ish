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
        <link rel="stylesheet" href="css/profile.css">
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

        <div id="wrapper">
            <div id="top">
                <div id="personal-info">
                    <div class="personal-info-left">
                        <!-- <label for="top-left" class="placeholder-pic"></label> -->
                        <img src="img/user.png" class="placeholder-pic" alt="user-icon"></img>
                    </div>
                    <div class="personal-info-right">
                        <label for="top-left" class="username"><?php echo $_SESSION["username"]; ?></label>
                        <br>
                        <label for="username" class="datejoined">created: <?php echo $_SESSION["date_created"]; ?></label>
                    </div>
                    
                </div>
                <div id="total-data"> 
                    <!-- Top column -->
                    <div class="total-average-data">
                        <!-- First row of data -->
                        <div>
                            <label>gross wpm</label>
                            <div class ="average-gross-wpm"></div>
                        </div>
                        <div>
                            <label>net wpm</label>
                            <div class ="average-net-wpm"></div>
                        </div>
                        <div>
                            <label>accuracy</label>
                            <div class ="average-accuracy"></div>
                        </div>
                    </div>
                    <!-- Bottom column -->
                    <div class="games">
                        <!-- Second row of data -->
                        <div>
                            <label>games completed</label>
                            <div class ="games-completed"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="falling-words-data">
                <div class="title">
                    <div>
                        <label>falling-words</label>
                    </div>
                </div>
                <!-- Top column -->
                <div class="average-data">
                    <!-- First row of data -->
                    <div>
                        <label>gross wpm</label>
                        <div class ="average-gross-wpm"></div>
                    </div>
                    <div>
                        <label>net wpm</label>
                        <div class ="average-net-wpm"></div>
                    </div>
                    <div>
                        <label>accuracy</label>
                        <div class ="average-accuracy"></div>
                    </div>
                    <div>
                        <label>games completed</label>
                        <div class ="games-completed"></div>
                    </div>
                </div>
            </div>

            <div id="type-racer-data">
                <div class="title">
                    <div>
                        <label>type-racer</label>
                    </div>
                </div>
                <div class="average-data">
                    <!-- First row of data -->
                    <div>
                        <label>gross wpm</label>
                        <div class ="average-gross-wpm"></div>
                    </div>
                    <div>
                        <label>net wpm</label>
                        <div class ="average-net-wpm"></div>
                    </div>
                    <div>
                        <label>accuracy</label>
                        <div class ="average-accuracy"></div>
                    </div>
                    <div>
                        <label>games completed</label>
                        <div class ="games-completed"></div>
                    </div>
                </div>
            </div>

            <div id="walking-words-data">
                <div class="title">
                    <div>
                        <label>walking-words</label>
                    </div>
                </div>
                <div class="average-data">
                    <!-- First row of data -->
                    <div>
                        <label>gross wpm</label>
                        <div class ="average-gross-wpm"></div>
                    </div>
                    <div>
                        <label>net wpm</label>
                        <div class ="average-net-wpm"></div>
                    </div>
                    <div>
                        <label>accuracy</label>
                        <div class ="average-accuracy"></div>
                    </div>
                    <div>
                        <label>games completed</label>
                        <div class ="games-completed"></div>
                    </div>
                </div>
            </div>

        </div>
        <script type="module" src="js/profile.js"></script>
    </body>
</html>