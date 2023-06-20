<?php

class Register extends Dbh {

    private $username;
    private $email;
    private $pwd;
    private $pwd_repeat;

    public function __construct($username, $email, $pwd, $pwd_repeat) {
        $this->username = $username;
        $this->email = $email;
        $this->pwd = $pwd;
        $this->pwd_repeat = $pwd_repeat;
    }

    // Inserts the user data given from the constructor.
    public function insertUser() {
        $this->checkUser();
        $stmt = $this->connect()->prepare("INSERT INTO users (username, email, pwd) VALUES (?, ?, ?)");

        $this->pwd = password_hash($this->pwd, PASSWORD_DEFAULT);

        if (!$stmt->execute([$this->username, $this->email, $this->pwd])) {
            $stmt = null;
            header("location: ../register.php?error=stmtfailed");
            exit();
        }

        $_SESSION["username"] = $this->username;

        // Everything below this just gets the sets the users id for the session.
        $stmt = $this->connect()->prepare("SELECT id FROM users WHERE username = ?");
        if (!$stmt->execute([$this->username])) {
            $stmt = null;
            header("location: ../register.php?error=stmtfailed");
            exit();
        }

        $users_info = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($users_info) == 0) {
            header("location: ../index.php?error=usernotfound");
            exit(); 
        }
        $_SESSION["users_id"] = $users_info[0]["id"];

        // Just assigns session variable to the time the user was made
        $stmt = $this->connect()->prepare("SELECT user_created FROM users WHERE id = ?");
        if (!$stmt->execute([$_SESSION["users_id"]])) {
            $stmt = null;
            header("location: ../register.php?error=stmtfailed");
            exit();
        }
        $users_info = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION["date_created"] = $users_info[0]["user_created"];
    }

    // Goes through serious of checks to ensure the user
    // has completed the form as expected.
    public function checkUser() {
        if ($this->emptyInput()) {
            $_SESSION["register_error"] = "Empty input.";
            header("location: ../register.php?error=empty");
            exit();
        }
        if ($this->isMatch()) {
            $_SESSION["register_error"] = "Passwords do not match.";
            header("location: ../register.php?error=pwdmatch");
            exit();
        }
        if ($this->isValidUsername()) {
            $_SESSION["register_error"] = "Invalid username (4 to 16 characters and absence of special characters).";
            header("location: ../register.php?error=invalduid");
            exit();
        }
        if ($this->isValidEmail()) {
            $_SESSION["register_error"] = "Invalid email.";
            header("location: ../register.php?error=invalidemail");
            exit();
        }
        if ($this->isUsernameOrEmailTaken()) {
            $_SESSION["register_error"] = "Username or email already exists.";
            header("location: ../register.php?error=uidoremailexists");
            exit();
        }
    }

    private function emptyInput() {
        if (empty($this->username) || empty($this->email) || empty($this->pwd) || empty($this->pwd_repeat)) {
            return true;
        }
        return false;
    }

    // Ensures both passwords are equal.
    private function isMatch() {
        if ($this->pwd != $this->pwd_repeat) {
            return true;
        }
        return false;
    }

    // https://stackoverflow.com/questions/4383878/php-username-validation
    private function isValidUsername() {
        // for english chars + numbers only
        // valid username, alphanumeric & longer than or equals 4 chars
        if (!preg_match('/^[a-zA-Z0-9]{4,16}$/', $this->username)) { 
            return true;
        }
        return false;
    }

    // Ensures the input is in the email format.
    private function isValidEmail() {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            return true;
        }
        return false;
    }

    // Gets data from the database and checks whether the email or username
    // is already in use.
    private function isUsernameOrEmailTaken() {
        $stmt = $this->connect()->prepare("SELECT username FROM users WHERE username = ? OR email = ?;");
        $stmt->execute([$this->username, $this->email]);

        if (!$stmt->execute([$this->username, $this->email])) {
            $stmt = null;
            header("location: ../register.php?error=stmtfailed");
            exit();
        }

        if ($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }

}