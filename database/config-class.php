<?php
class Config extends Dbh {
    public function setDefaultConfig() {
        $stmt = $this->connect()->prepare("INSERT INTO users_config (users_id) VALUES (?);");

        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("location: ../index.php?error=stmtfailed");
            exit();
        }
    }

    public function updateConfig($config) {
        foreach ($config as $key => $value) {
            $stmt = $this->connect()->prepare("UPDATE users_config SET {$key} = \"{$value}\" WHERE users_id = ?;");
            if (!$stmt->execute([$_SESSION["users_id"]])) {
                $stmt = null;
                header("location: ../index.php?error=stmtfailed");
                exit();
            }
        }
    }

    public function sendConfigToClient() {
        $stmt = $this->connect()->prepare("SELECT spawn, difficulty, timer, speed, lives, words FROM users_config WHERE users_id = ?;");
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("location: ../index.php?error=stmtfailed");
            exit();
        }
        $queried_config = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($queried_config[0]);
    }
}