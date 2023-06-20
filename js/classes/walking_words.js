import { Game } from "./game.js";

// 8 x 16 grid
class WalkingWords extends Game {
    constructor(config) {
        super(config, "walking_words");
        this.random_words = [];
        this.valid_positions = [];
        this.current_position;
        this.solution_pos;
    }
    async generateWords() {
        // Wait till this.text contains the words from the text_file.
        await this.stripTextFile();
        let rand_int;
        for (let i = 0; i < 8 * 16; i++) {
            rand_int = Math.floor(Math.random() * this.text.length); // "words" => number of words to type
            this.random_words.push(this.text[rand_int]);
        }
        this.ensureWordsAreUnique();
    }
    // Ensures that the valid direction movement has a unique first character.
    // This is to ensure the user goes to the direction they desire
    /* DO NOT LOOK AT THE CODE EVER */
    ensureWordsAreUnique() {
        let rand_int;
        this.random_words.forEach((word, index) => {
            // left side
            if (this.random_words[index + 1] != undefined && this.random_words[index - 1] != undefined && this.random_words[index - 8] != undefined && this.random_words[index + 8] != undefined) {
                while (this.random_words[index - 1].charAt(0) == word.charAt(0) || this.random_words[index - 1].charAt(0) == this.random_words[index + 1].charAt(0)
                || this.random_words[index - 1].charAt(0) == this.random_words[index - 8].charAt(0) || this.random_words[index - 1].charAt(0) == this.random_words[index + 8].charAt(0)) {
                    rand_int = Math.floor(Math.random() * this.text.length);
                    this.random_words.splice(index - 1, 1);
                    this.random_words.splice(index - 1, 0, this.text[rand_int]);
                }
            }
            // right side
            if (this.random_words[index + 1] != undefined && this.random_words[index - 1] != undefined && this.random_words[index - 8] != undefined && this.random_words[index + 8] != undefined) {
                while (this.random_words[index + 1].charAt(0) == word.charAt(0) || this.random_words[index + 1].charAt(0) == this.random_words[index - 1].charAt(0)
                || this.random_words[index + 1].charAt(0) == this.random_words[index - 8].charAt(0) || this.random_words[index + 1].charAt(0) == this.random_words[index + 8].charAt(0)) {
                    rand_int = Math.floor(Math.random() * this.text.length);
                    this.random_words.splice(index + 1, 1);
                    this.random_words.splice(index + 1, 0, this.text[rand_int]);
                }
            }

            // top side
            if (this.random_words[index + 1] != undefined && this.random_words[index - 1] != undefined && this.random_words[index - 8] != undefined && this.random_words[index + 8] != undefined) {
                while (this.random_words[index - 8].charAt(0) == word.charAt(0) || this.random_words[index - 8].charAt(0) == this.random_words[index - 1].charAt(0)
                || this.random_words[index - 8].charAt(0) == this.random_words[index + 1].charAt(0) || this.random_words[index - 8].charAt(0) == this.random_words[index + 8].charAt(0)) {
                    rand_int = Math.floor(Math.random() * this.text.length);
                    this.random_words.splice(index - 8, 1);
                    this.random_words.splice(index - 8, 0, this.text[rand_int]);
                }
            }

            // bottom side
            if (this.random_words[index + 1] != undefined && this.random_words[index - 1] != undefined && this.random_words[index - 8] != undefined && this.random_words[index + 8] != undefined) {
                while (this.random_words[index + 8].charAt(0) == word.charAt(0) || this.random_words[index + 8].charAt(0) == this.random_words[index - 1].charAt(0)
                || this.random_words[index + 8].charAt(0) == this.random_words[index + 1].charAt(0) || this.random_words[index + 8].charAt(0) == this.random_words[index - 8].charAt(0)) {
                    rand_int = Math.floor(Math.random() * this.text.length);
                    this.random_words.splice(index + 8, 1);
                    this.random_words.splice(index + 8, 0, this.text[rand_int]);
                }
            }
            // middle
            if (this.random_words[index + 1] != undefined && this.random_words[index - 1] != undefined && this.random_words[index - 8] != undefined && this.random_words[index + 8] != undefined) {
                while (word.charAt(0) == this.random_words[index + 8].charAt(0) || word.charAt(0)  == this.random_words[index - 1].charAt(0)
                || word.charAt(0) == this.random_words[index + 1].charAt(0) || word.charAt(0)  == this.random_words[index - 8].charAt(0)) {
                    rand_int = Math.floor(Math.random() * this.text.length);
                    this.random_words.splice(index, 1);
                    this.random_words.splice(index, 0, this.text[rand_int]);
                }
            }
        });
    }

    changeWord(char, index) {
        let rand_int;
        while (true) {
            rand_int = Math.floor(Math.random() * this.text.length);
            if (this.text[rand_int].charAt(0) != char) {
                this.random_words.splice(index, 1);
                this.random_words.splice(index, 0, this.random_words[rand_int]);
            }
        }
    }

    createGrid() {
        const game_grid = document.querySelector(".game-grid");

        let div;
        let child_span;

        this.random_words.forEach((word) => {
            div = document.createElement("div");
            for (let char of word) {
                child_span = document.createElement("span");
                child_span.textContent = char;  
                child_span.style.color = "#314941";
                div.appendChild(child_span);
            }
            game_grid.append(div);
        });
    }

    // Generates a random position on the grid for the user to go to.
    updateSolution() {
        const game_grid = document.querySelector(".game-grid");
        let rand_int = Math.floor(Math.random() * (8 * 16));
        game_grid.querySelectorAll("div")[rand_int].style.border = "1px solid #6da995";
        this.solution_pos = rand_int;
    }
    updatePositions(pos) {
        const game_grid = document.querySelector(".game-grid");
        const movement_increments = [1, -1, -8, 8];

        // Stores the positions the user is allowed to type to.
        // Also is given by indicators    
        this.valid_positions = [];
        movement_increments.forEach((num) => {
            if (game_grid.querySelectorAll("div")[pos + num] != undefined) {
                this.valid_positions.push(pos + num);
                game_grid.querySelectorAll("div")[pos + num].style.border = "1px solid #544b8d";
            } else {
                // Warps back to the bottom of the grid
                for (let i = 0; i < 8; i++) {
                    if (pos == i) {
                        this.valid_positions.push(pos + (8 * (16 - 1)));
                        game_grid.querySelectorAll("div")[pos + (8 * (16 - 1))].style.border = "1px solid #544b8d";
                    }
                }
                // Warps back to the top of the grid
                for (let i = 8 * 15; i < 8 * 16; i++) {
                    if (pos == i) {
                        this.valid_positions.push(pos - (8 * (16 - 1)));
                        game_grid.querySelectorAll("div")[pos - (8 * (16 - 1))].style.border = "1px solid #544b8d";
                    }
                }
            }
        });

        // Ensure the solution border doesn't get overlapped.
        game_grid.querySelectorAll("div")[this.solution_pos].style.border = "1px solid #6da995";

        movement_increments.forEach((num) => {
            if (game_grid.querySelectorAll("div")[this.current_position + num] != undefined) {
                game_grid.querySelectorAll("div")[this.current_position + num].style.border = null;
            } else {
                // Resets the border that warped to the bottom of the grid
                for (let i = 0; i < 8; i++) {
                    if (pos == i) {
                        this.valid_positions.push(pos + (8 * (16 - 1)));
                        game_grid.querySelectorAll("div")[pos + (8 * (16 - 1))].style.border = null;
                    }
                }
                // Resets the border that warped to the top of the grid
                for (let i = 8 * 15; i < 8 * 16; i++) {
                    if (pos == i) {
                        this.valid_positions.push(pos - (8 * (16 - 1)));
                        game_grid.querySelectorAll("div")[pos - (8 * (16 - 1))].style.border = null;
                    }
                }
            }
        });

        // Orange represents the curret position
        game_grid.querySelectorAll("div")[pos].style.border = "1px solid #8d4b70";

        this.current_position = pos;
    }
    // Registers users keys 
    getUserInput(e) {
        const game_grid = document.querySelector(".game-grid");
        const grid = game_grid.querySelectorAll("div");
        let found = false
        this.valid_positions.forEach((pos) => {
            // Validates user input on whether the character typed is correct or not
            // indicated with colours.
            if (grid[pos].querySelectorAll("span")[0].textContent == e.target.value[0]) {
                grid[pos].querySelectorAll("span").forEach((span, index) => {
                    if (index < e.target.textLength) {
                        if (span.textContent == e.target.value[index]) {
                            found = true;
                            span.style.color = "#3bff97";
                            // From Game class (parent) to get correct characters typed
                            this.getCorrectEntries(e, index);
                        } else {
                            span.style.color = "#ff5151";
                        }
                    } else {
                        span.style.color = "#314941";
                    }
                });
            } else {
                // Allows the user to clear the first letter since the above condition only checks if it's correct
                if (e.data == null) {
                    grid[pos].querySelectorAll("span")[0].style.color = "#314941";
                }
            }
            // Updates the valid position the user can type to.
            if (e.target.value == grid[pos].textContent) {
                this.updatePositions(pos);
                // Clears input
                e.target.value = "";
                // Resets colours
                grid[pos].querySelectorAll("span").forEach((span) => {
                    span.style.color = "#314941";
                })
            }
            // Changes the position of the new goal
            if (this.current_position == this.solution_pos) {
                // Reset timer if the user reaches to the solution 
                this.display_duration = config["timer"];
                this.updateSolution();
            }   

        });
    }
}


export { WalkingWords };