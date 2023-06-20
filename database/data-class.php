<?php
class Data extends Dbh {
    
    private $data;
    private $average_data;

    public function __construct($data) {
        $this->data = $data;
    }
    
    /* Used to provide data to a db depending on the game played */
    public function insertData() {
        $stmt = $this->connect()->prepare("INSERT INTO {$this->data["game"]}_data (users_id, gross_wpm, net_wpm, accuracy) VALUES (?, ?, ?, ?)");;

        if (!$stmt->execute([$_SESSION["users_id"], $this->data["gross_wpm"], $this->data["net_wpm"], $this->data["accuracy"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }
    }   
    // Insert combined average data of all games if user did not previously exist.
    public function insertCombinedAverageData() {
        $stmt = $this->connect()->prepare("INSERT INTO average_combined_data (users_id, username, gross_wpm, net_wpm, accuracy, games_completed) VALUES (?, ?, ?, ?, ?, ?)");;

        if (!$stmt->execute([$_SESSION["users_id"], $_SESSION["username"], $this->average_data["total_data"]["gross_average"], $this->average_data["total_data"]["net_average"], 
                            $this->average_data["total_data"]["acc_average"], $this->average_data["total_data"]["games_completed"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");  
            exit(); 
        }
    }
    // Update the average data 
    private function updateCombinedAverageData() {
        $sql = "UPDATE average_combined_data 
                SET    gross_wpm = {$this->average_data["total_data"]["gross_average"]}, 
                       net_wpm = {$this->average_data["total_data"]["net_average"]}, 
                       accuracy = {$this->average_data["total_data"]["acc_average"]},
                       games_completed = {$this->average_data["total_data"]["games_completed"]}
                WHERE  users_id = ?;";
        $stmt = $this->connect()->prepare($sql);
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }
    }
    /* Everything below this is for querying data to the db's and returning the response
       to profile.js to be displayed when profile.php is loaded. */
    private function getCombinedAverageData() {
        $sql = 'SELECT gross_wpm, net_wpm, accuracy FROM falling_words_data
                WHERE users_id = ?
                UNION ALL
                SELECT gross_wpm, net_wpm, accuracy FROM type_racer_data 
                WHERE users_id = ?
                UNION ALL
                SELECT gross_wpm, net_wpm, accuracy FROM walking_words_data
                WHERE users_id = ?;';

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([$_SESSION["users_id"], $_SESSION["users_id"], $_SESSION["users_id"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }

        $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Declare a array to append data in for loop.
        $this->average_data["total_data"] = [
            "gross_average" => 0,
            "net_average" => 0,
            "acc_average" => 0,
            "games_completed" => count($user_data)
        ];

        for ($i = 0; $i < count($user_data); $i++) {
            $this->average_data["total_data"]["gross_average"] += $user_data[$i]["gross_wpm"];
            $this->average_data["total_data"]["net_average"] += $user_data[$i]["net_wpm"];
            $this->average_data["total_data"]["acc_average"] += $user_data[$i]["accuracy"];
        }
        if (count($user_data) > 0) {
            $this->average_data["total_data"]["gross_average"] = $this->average_data["total_data"]["gross_average"] / count($user_data);
            $this->average_data["total_data"]["net_average"] = $this->average_data["total_data"]["net_average"] / count($user_data);
            $this->average_data["total_data"]["acc_average"] = $this->average_data["total_data"]["acc_average"] / count($user_data);
        }
    }
    public function sendCombinedAverageData() {
        $this->getCombinedAverageData();
        // Ensures we insert then update the values
        $stmt = $this->connect()->prepare("SELECT users_id FROM average_combined_data WHERE users_id = ?;");
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit();
        }
        $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($user_data) == 0) {
            $this->insertCombinedAverageData();
        } else {
            $this->updateCombinedAverageData();
        }   
    }
    // Loops through an array with relevant db names to get average wpm and accuracy.
    private function getGamesAverageData() {
        $db = ["falling_words_data", "type_racer_data", "walking_words_data"];

        foreach ($db as $table) {
            $stmt = $this->connect()->prepare("SELECT avg(gross_wpm), avg(net_wpm), avg(accuracy) FROM {$table} WHERE users_id = ?;");

            if (!$stmt->execute([$_SESSION["users_id"]])) {
                $stmt = null;
                header("Location: ../index.php?error=stmtfailed");
                exit(); 
            }
    
            $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC); 

            // round() can turn a null value into 0,
            // so there is no need to catch an error 
            $this->average_data["{$table}"] = [
                "gross_average" => round($user_data[0]["avg(gross_wpm)"], 2),
                "net_average" => round($user_data[0]["avg(net_wpm)"], 2),
                "acc_average" => round($user_data[0]["avg(accuracy)"], 2)
            ];
        }
    }
    private function insertGameAverageData() {
        $stmt = $this->connect()->prepare("INSERT INTO average_{$this->data["game"]}_data (users_id, username, gross_wpm, net_wpm, accuracy, games_completed) VALUES (?, ?, ?, ?, ?, ?)");;

        if (!$stmt->execute([$_SESSION["users_id"], $_SESSION["username"], 
            $this->average_data[$this->data["game"]."_data"]["gross_average"],
            $this->average_data[$this->data["game"]."_data"]["net_average"],
            $this->average_data[$this->data["game"]."_data"]["acc_average"],
            $this->average_data[$this->data["game"]."_data"]["games_completed"]])) {

            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }
    }
    private function updateGameAverageData() {
        $sql = "UPDATE average_{$this->data["game"]}_data
                SET    gross_wpm = {$this->average_data[$this->data["game"]."_data"]["gross_average"]}, 
                       net_wpm = {$this->average_data[$this->data["game"]."_data"]["net_average"]}, 
                       accuracy = {$this->average_data[$this->data["game"]."_data"]["acc_average"]},
                       games_completed = {$this->average_data[$this->data["game"]."_data"]["games_completed"]}
                WHERE  users_id = ?;";
        $stmt = $this->connect()->prepare($sql);
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }
    }
    // Loops through an array with relevant db names and gets total rows depending on the user.
    // Total rows can represent as the number of games completed
    private function getGamesCompletedData() {
        $db = ["falling_words_data", "type_racer_data", "walking_words_data"];

        foreach ($db as $table) {
            $stmt = $this->connect()->prepare("SELECT COUNT(*) FROM {$table} WHERE users_id = ?;");

            if (!$stmt->execute([$_SESSION["users_id"]])) {
                $stmt = null;
                header("Location: ../index.php?error=stmtfailed");
                exit(); 
            }
    
            $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC); 
            
            $this->average_data["{$table}"] += [
                "games_completed" => $user_data[0]["COUNT(*)"]
            ];
        }
    }
    public function sendGameAverageData() {
        $this->getGamesAverageData();
        $this->getGamesCompletedData();

        $stmt = $this->connect()->prepare("SELECT users_id FROM average_{$this->data["game"]}_data WHERE users_id = ?;");
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("Location: ../index.php?error=stmtfailed");
            exit();
        }
        $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($user_data) == 0) {
            $this->insertGameAverageData();
        } else {
            $this->updateGameAverageData();
        }
    }
    public function sendDataToClient() {
        $this->getCombinedAverageData();
        $this->getGamesAverageData();
        $this->getGamesCompletedData();

        echo json_encode($this->average_data);
    }   

    public function sendLeaderboardDataToClient($cfg) {
        $stmt = $this->connect()->prepare("SELECT username, net_wpm, gross_wpm, accuracy, games_completed FROM {$cfg["database"]} ORDER BY {$cfg["data"]} DESC;");
        if (!$stmt->execute()) {
            $stmt = null; 
            header("Location: ../index.php?error=stmtfailed");
            exit(); 
        }
        $user_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user_data);
    }
}