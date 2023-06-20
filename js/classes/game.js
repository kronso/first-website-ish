class Game {
    constructor(config, game) {
        this.config = config;
        this.text = [];
        this.timer;
        this.display_duration = config["timer"];

        // Data that will be sent to the database if a game is over.
        this.data = {
            gross_wpm: null, net_wpm: null, accuracy: null, game: game
        }

        this.total_entries = null;
        this.correct_entries = null;
        this.uncorrected_errors = null;
        this.time_elapsed = null;
    }

    async stripTextFile() {
        switch(this.config["difficulty"]) {
            case "hard": this.config["difficulty"] = "hard_words.txt"; break;
            case "easy": this.config["difficulty"] = "easy_words.txt"; break;
        }
        const response = await fetch(this.config["difficulty"]);
        const text_file = await response.text();

        this.text = [];
        this.text = text_file.split("\n");
    }

    timerBegin() {
        // Display the initial time
        document.querySelector(".timer").textContent = this.display_duration;
        this.timer = setInterval(() => {
            document.querySelector(".timer").textContent = this.display_duration - 1;
            this.display_duration--;

            // Updates data every second
            // Has to be ordered this way
            this.time_elapsed++;
            this.getUncorrectedErrors();
            this.calculateData();
            this.displayData();

            if (this.display_duration == 0) {
                clearInterval(this.timer);
                this.sendData();
            }
        }, 1000);
    }
    displayData() {
        document.querySelectorAll(".game-data div").forEach((div) => {
            switch(div.className) {
                case "gross-wpm":     div.textContent = parseInt(this.data["gross_wpm"]); break;
                case "net-wpm":       div.textContent = parseInt(this.data["net_wpm"]); break;
                case "accuracy":      div.textContent = parseInt(this.data["accuracy"]); break;
                case "time-elapsed":  div.textContent = parseInt(this.time_elapsed); break;
            }   
        });
    }
    calculateData() {
        this.data["gross_wpm"] = (this.total_entries / 5) / (this.time_elapsed / 60);
        // condition ensures the user doesn't get negative wpm
        this.data["net_wpm"] = this.data["gross_wpm"] - (this.uncorrected_errors / (this.time_elapsed / 60));
        if (this.data["net_wpm"] < 0) {
            this.data["net_wpm"] = 0;
        }
        this.data["accuracy"] = (this.correct_entries / this.total_entries) * 100;
    }
    getCorrectEntries(e, index) {
        if (e.data != null) {
            if (index == e.target.textLength - 1) {
                this.correct_entries++;
            }
        }
    }
    getTotalEntries(e) {
        if (e.data != null) {
            this.total_entries++;
        }
    }
    getUncorrectedErrors() {
        this.uncorrected_errors = 0;
        // https://www.speedtypingonline.com/typing-equations
        // uncorrected errors
        // time (min)
        // all typed entries
        // correct entries
        // total entries length  
        if (document.querySelector(".type-racer").style.display != "none") {
            document.querySelectorAll("span").forEach((span) => {
                if (span.style.color == "rgb(255, 81, 81)") {
                    this.uncorrected_errors++;
                }
            });
        } else if (document.querySelector(".game-border").style.display != "none") {
            document.querySelectorAll(".game-border div span").forEach((span) => {
                if (span.style.color == "rgb(255, 81, 81)") {
                    this.uncorrected_errors++;
                }
            });
        } else if (document.querySelector(".game-grid").style.display != "none") {
            document.querySelectorAll(".game-grid div span").forEach((span) => {
                if (span.style.color == "rgb(255, 81, 81)") {
                    this.uncorrected_errors++;
                }
            });
        }
    }

    // https://sebhastian.com/pass-javascript-variables-to-php/
    // Called anywhere the game ends
    async sendData() {
        fetch("includes/data-inc.php", {
            method: "POST",
            body: JSON.stringify(this.data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.text());
    }
    
}

export { Game };