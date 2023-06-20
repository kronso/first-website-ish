<?php

class Dbh {
    public function connect() {
        try {
            $username = "root";
            $password = "";
            $dsn = new PDO("mysql:host=localhost;dbname=kitype", $username, $password);
            return $dsn;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}