import { Game } from "./game.js";

class FallingWords extends Game {
    constructor(config) {
        super(config, "falling_words");
        this.text = [];

        this.config = config;
        this.display_lives = this.config["lives"];
        // Used to put the newest word above the oldest word
        // timer (seconds) * spawn-rate (miliseconds) = maximum word creation.
        this.z_index = config["timer"] * config["spawn"];

        this.spawn_interval;
        this.speed_interval;
    }  

    // Generates a random word that fits into the game-border
    createWord() {
        // Used to get a random word from the this.text
        let rand_int = Math.floor(Math.random() * this.text.length);

        let new_word = document.createElement("div");
        new_word.className = "word";
        new_word.style.top = "-10px";    // -5px is perfectly outside the game-border
        new_word.style.zIndex = this.z_index--;
        
        let child;
        for (let char of this.text[rand_int]) {
            child = document.createElement("span");
            child.textContent = char;   
            new_word.appendChild(child);
        }

        // https://stackoverflow.com/questions/31305071/measuring-text-width-height-without-rendering
        // Get the width of the new_word without it being rendered
        const element = document.createElement("canvas");
        let context = element.getContext("2d");
        context.font = "16px Anonymous Pro";
        
        const range = game_border.clientWidth - context.measureText(new_word.textContent).width;

        // Loop ensures the entire word is within the game-border.
        let rand_pos;   
        while (true) {
            rand_pos = Math.floor(Math.random() * range);
            if (rand_pos >= 0) {
                new_word.style.left = rand_pos + "px";
                break;
            }
        }
        // Append the new random word.    
        game_border.appendChild(new_word);
    }

    // Function is recursive because the delay parameter does not upadate,
    // so I set the interval as a Timeout and called itself if the game is not over. 
    async delayWord() {
        this.spawn_interval = setTimeout(()=> {  
            // if the user changes games, hide the display
            // needed to do this or the game would still be running
            if (document.querySelector(".game-border").style.display != "none") {
                this.createWord();
            } else {
                clearTimeout(this.spawn_interval);
                clearInterval(this.speed_interval);
                clearInterval(this.timer);
                return; 
            }
            this.delayWord();


        }, this.config["spawn"]);
    }

    // https://stackoverflow.com/questions/15195209/how-to-get-font-size-in-html
    // https://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
    wordOverflow(el) {
        let style = window.getComputedStyle(el, null).getPropertyValue("font-size");
        let fontSize = parseFloat(style); 
        if (el.clientWidth + fontSize < el.scrollWidth   
            || el.clientHeight + fontSize < el.scrollHeight) {
                return true;
            }
        return false;
    }

    // Increment pixel per 0? milisecond
    // Delay set to 0 because it makes the text fall smoother lol.
    async fallingWords() {    
        let all_words;

        await this.delayWord();
        document.querySelector(".lives").textContent = this.display_lives;
        this.speed_interval = setInterval(() => {
            all_words = document.querySelectorAll(".word");     
            for (let word of all_words) {
                word.style.top = parseFloat(word.style.top) + this.config["speed"] + "px";
                if (this.wordOverflow(game_border)) {
                    document.querySelector(".lives").textContent = --this.display_lives;
                    word.remove();
                } 
            }

            // Stops game
            if (this.display_lives == 0 || this.display_duration == 0) {
                clearInterval(this.speed_interval);
                clearTimeout(this.spawn_interval);
                clearTimeout(this.timer);
            }
            // Sends data to database
            // Method from parent class
            if (this.display_lives == 0) {
                this.sendData();
            }

            // Just and indication for the word to be completed.
            if (all_words[0] != undefined) {
                all_words[0].style.textDecoration = "underline";
                all_words[0].style.textUnderlineOffset = "3px";
            }
        }, 0);
    }

    // Checks whether the first letter of the word closest to the bottom
    // is the same as the users input.
    // Don't need to use backspace since it will clear the input element.
    getUserInput(e) {
        let lowest_word = document.querySelectorAll(".word")[0];
        let input = document.querySelector(".user-input");
        
        if (lowest_word.firstChild.textContent == e.data) {
            this.getCorrectEntries(e, e.target.textLength - 1);
            lowest_word.style.color = "#3bff97";
            lowest_word.firstChild.remove();
            input.value = "";
            if (lowest_word.textContent == input.value) {
                lowest_word.remove();
                input.value = "";
            }   
        } else {
            lowest_word.style.color = "#ff5151";
        }
    }
}
const game_border = document.querySelector(".game-border");

export { FallingWords };
