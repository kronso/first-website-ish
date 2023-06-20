import { FallingWords } from "./classes/falling_words.js";
import { Typeracer } from "./classes/typeracer.js";
import { WalkingWords } from "./classes/walking_words.js";

let game;
let timer_started;

async function startFallingWords() {
    timer_started = false;
    clearInterval(game.timer);
    clearTimeout(game.spawn_interval);
    clearInterval(game.speed_interval);

    // Resets all data being displayed
    resetDataDisplay();

    // Displays current game and hides the others
    document.querySelector(".game-border").style.display = "initial";
    document.querySelector(".game-grid").style.display = "none";
    document.querySelector(".type-racer").style.display = "none";

    // Removes words inside border
    document.querySelectorAll(".game-border div").forEach(element => {
        element.remove();
    });

    config = await getConfig();

    game = new FallingWords(config);
    await game.stripTextFile();
    game.timerBegin();
    timer_started = true;
    game.fallingWords();    
}
async function startTyperacer() {
    timer_started = false;
    clearInterval(game.timer);
    
    resetDataDisplay();
    
    document.querySelector(".type-racer").style.display = "initial";
    document.querySelector(".game-grid").style.display = "none";
    document.querySelector(".game-border").style.display = "none";
    
    // Removes the letters
    document.querySelectorAll(".type-racer span").forEach(element => {
        element.remove();
    });
    
    console.log(config);    
    
    game = new Typeracer(config);
    await game.stripTextFile();
    await game.generateWords();
    
    await game.appendWords();
    game.getLineBreaks();
}
async function startWalkingWords() {
    timer_started = false;
    clearInterval(game.timer);

    resetDataDisplay();

    document.querySelector(".game-grid").style.display = "grid";
    document.querySelector(".game-border").style.display = "none";
    document.querySelector(".type-racer").style.display = "none";

    // Removes the grids from the game-grid
    document.querySelectorAll(".game-grid div").forEach(element => {
        element.remove();
    });

    console.log(config); 

    game = new WalkingWords(config);
    await game.generateWords();
    game.createGrid();
    game.updateSolution();
    game.updatePositions(Math.floor(Math.random() * (8 * 16)));
}
function resetDataDisplay() {
    document.querySelector(".timer").textContent = "";
    document.querySelector(".user-input").value = "";
    document.querySelector(".gross-wpm").textContent = "";
    document.querySelector(".net-wpm").textContent = "";
    document.querySelector(".time-elapsed").textContent = "";
    document.querySelector(".accuracy").textContent = "";
    document.querySelector(".lives").textContent = "";
}

/*
*
*               EVENT LISTENERS
*
*/
const falling_words_button = document.querySelector(".falling-words-button");
falling_words_button.addEventListener("click", async () => {
    // Resets all the indicators of the selected game
    document.querySelectorAll(".game-bar button").forEach((button) => button.style.color = null);
    // Indicates the set default option using a colour
    falling_words_button.style.color = "#4b6f8d";
    startFallingWords();
});
const type_racer_button = document.querySelector(".type-racer-button");
type_racer_button.addEventListener("click", async () => {
    document.querySelectorAll(".game-bar button").forEach((button) => button.style.color = null);
    type_racer_button.style.color = "#4b6f8d";
    startTyperacer();
});
const walking_words_button = document.querySelector(".walking-words-button");
walking_words_button.addEventListener("click", async () => {
    document.querySelectorAll(".game-bar button").forEach((button) => button.style.color = null);
    walking_words_button.style.color = "#4b6f8d";
    startWalkingWords();
});
// Initial game is type-racer
window.addEventListener("load", async () => {
    timer_started = false;
    document.querySelector(".type-racer").style.display = "initial";
    document.querySelector(".game-border").style.display = "none";
    document.querySelector(".game-grid").style.display = "none";
    // Only need to get the config once
    // it'll update from there 
    config = await getConfig();
    console.log(config);

    game = new Typeracer(config);   
    await game.stripTextFile(); 
    await game.generateWords();
    game.appendWords();
    game.getLineBreaks();

    type_racer_button.style.color = "#4b6f8d";
});
document.addEventListener("keydown", (e) => {
    document.querySelector(".user-input").focus();
    if (e.code == "Tab") {
        // Prevents tab from bubbling outside the DOM
        e.preventDefault();
        if (document.querySelector(".game-border").style.display != "none") {
            startFallingWords();
        } else if (document.querySelector(".type-racer").style.display != "none") {
            startTyperacer();   
        } else if (document.querySelector(".game-grid").style.display != "none") {
            startWalkingWords();
        } 
    }
})
// Updates game.line_breaks if the game is typeracer
if (document.querySelector(".type-racer").style.display == "initial") {
    window.addEventListener("resize", () => {
        game.getLineBreaks()
    });
}
// Focuses on the input element if they press a key in the DOM.
document.addEventListener("keydown", (e) => {
    if (e.getModifierState("CapsLock")) {
        document.querySelector("#caps-lock-popup").style.display = "initial";
    } else {
        document.querySelector("#caps-lock-popup").style.display = "none";
        // Ensures the key presses are alpha keys
        // Kinda shitty way to do it but works lol
        if (e.code.charAt(0) == "K") {
            if (!timer_started) {
                game.timerBegin();
                timer_started = true;
            }
        }
    }
});
// Gets user input on keypress
document.addEventListener("input", (e) => {
    // Plays key being press audio
    var audio = new Audio("audio/keypress.wav");
    audio.play();

    game.getUserInput(e);  
    game.getUncorrectedErrors();
    game.getTotalEntries(e);
});

