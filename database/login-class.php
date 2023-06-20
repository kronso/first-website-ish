<?php

class Login extends Dbh {

    private $user_id;
    private $pwd;

    public function __construct($user_id, $pwd) {   
        $this->user_id = $user_id;
        $this->pwd = $pwd;
    }
    
    public function getUser() {
        $stmt = $this->connect()->prepare("SELECT pwd FROM users WHERE username = ? OR email = ?");

        if (!$stmt->execute([$this->user_id, $this->user_id])) {
            $stmt = null;
            header("location: ../login.php?error=stmtfailed");
            exit();
        }

        // Checks if the username or email entered exists.
        $login_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($login_data) == 0) {
            $_SESSION["login_error"] = "User not found.";
            header("location: ../login.php?error=usernotfound");
            exit();
        }

        $check_pwd = password_verify($this->pwd, $login_data[0]["pwd"]);

        if (!$check_pwd) {
            $_SESSION["login_error"] = "Incorrect email or password.";
            header("location: ../login.php?error=uidorpwd");
            exit();                    
        } else {
            $stmt = $this->connect()->prepare("SELECT * FROM users WHERE username = ? OR email = ? AND pwd = ?;");

            if (!$stmt->execute([$this->user_id, $this->user_id, $login_data[0]["pwd"]])) {
                $stmt = null;
                header("location: ../login.php?error=stmtfailed");
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $_SESSION["username"] = $user[0]["username"];
            $_SESSION["users_id"] = $user[0]["id"];
            $_SESSION["date_created"] = $user[0]["user_created"];
        }
        return true;
    }
}