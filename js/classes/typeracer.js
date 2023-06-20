import { Game } from "./game.js";

class Typeracer extends Game {
    constructor(config) {
        super(config, "type_racer");
        this.random_words = [];
        this.line_breaks = [0];
    }

    async generateWords() {
        // Wait till this.text contains the words from the text_file.
        let rand_int;
        for (let i = 0; i < this.config["words"]; i++) {
            rand_int = Math.floor(Math.random() * this.text.length); // "words" => number of words to type
            this.random_words.push(this.text[rand_int]);
        }
    }

    // Creates a div with class="word" which contains-
    // spans which each contain a letter.
    async appendWords() {
        const type_racer = document.querySelector(".type-racer");
        let child_span;
        this.random_words.forEach((word, index) => {
            for (let char of word) {
                child_span = document.createElement("span");
                child_span.textContent = char;  
                child_span.style.color = "#314941";
                type_racer.appendChild(child_span);
            }
            if (index != this.random_words.length - 1) {
                child_span = document.createElement("span");
                child_span.textContent = " ";   
                type_racer.appendChild(child_span);
            }
        });
    }

    // Gets the rendered position of where the line breaks.
    // Hides when a passes a line of text
    // Shows when the user leaves a line of text
    getLineBreaks() {
        this.line_breaks = [0];
        document.querySelectorAll("span").forEach((span, index) => {
            if (span.offsetWidth == 0) {
                this.line_breaks.push(index);
            }
        });
    }

    // Hides line of text if the user passes the line break of the text (maximum rendered width) 
    hideLine() {
        const input = document.querySelector(".user-input");
        this.line_breaks.forEach((pos, index) => {
            if (pos == input.value.length - 1) {
                for (let i = this.line_breaks[index - 1]; i < input.value.length; i++) {
                    document.querySelectorAll("span")[i].style.display = "none";
                }
            }
        });
    }
    // If this.hideLine() is called, the next line will take its place by "shifting" up. 
    nextLine() {
        const input = document.querySelector(".user-input");
        this.line_breaks.forEach((pos, index) => {
            if (pos == input.value.length) {
                for (let i = this.line_breaks[index - 1]; i <= input.value.length; i++) {
                    document.querySelectorAll("span")[i].style.display = "initial";
                }
            }
        });
    }
    // Registers users keys 
    getUserInput(e) {
        const input = document.querySelector(".user-input");
        const all_spans = document.querySelectorAll(".type-racer span");
        // Registers backspace
        if (e.data == null) {
            this.nextLine();
            // Deletes underline if the user goes back to the word
            if (all_spans[input.value.length].textContent == " ") {
                let idx = input.value.length;
                while (all_spans[idx - 1].textContent != " ") {
                    all_spans[idx - 1].style.textDecoration = null;
                    idx--;
                    if (idx == 0) {break;}
                }
            }
        } else {
            this.hideLine();
        }

        // Loops through entire text and checks if the user input is equal to the text;
        /* 
         *  It kinda seems inefficient to loop after every input, BUT
         *  shifts the user input according to where they delete text.
         *  (highlight + delete) AND (moving arrow keys and deleting chars/text)
         *
         */
        all_spans.forEach((span, index) => {
            if (index < input.value.length) {
                if (span.textContent == input.value[index]) {
                    span.style.color = "#3bff97";
                    // From Game class (parent) to get correct characters typed
                    this.getCorrectEntries(e, index);
                } else {
                    span.style.color = "#ff5151";
                }

                // Creates an underline if there is a mistake in it
                if (span.textContent == " ") {
                    let error = false;
                    let idx = index;
                    while (all_spans[idx - 1].textContent != " ") {
                        if (input.value[idx - 1] != all_spans[idx - 1].textContent) {
                            error = true;
                            break;
                        }
                        idx--;
                        if (idx == 0) {break;}
                    }
                    if (error) {
                        idx = index;
                        while (all_spans[idx - 1].textContent != " ") {
                            all_spans[idx - 1].style.textDecoration = "underline";
                            all_spans[idx - 1].style.textUnderlineOffset = "3px";
                            all_spans[idx - 1].style.textDecorationColor = "#ff5151";
                            idx--;
                            if (idx == 0) {break;}
                        }
                    }
                }
            } else {
                span.style.color = null;
            }
        });

        // Ends game if user reaches the words-length limit
        if (e.target.textLength == all_spans.length) {
            clearInterval(this.timer);
            this.sendData();
        }
    }
}

export { Typeracer }; // Send to main file somewhere.