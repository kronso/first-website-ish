// The button that displays the options
let spawn_button = document.querySelector("#config-spawn"); 
// The div that nests the options
let spawn_options_div = document.querySelector("#config-spawn-content");
// The options
let spawn_options = document.querySelectorAll(".config-spawn-button");

let words_button = document.querySelector("#config-words");
let words_options_div = document.querySelector("#config-words-content");
let words_options = document.querySelectorAll(".config-words-button");

let timer_button = document.querySelector("#config-timer");
let timer_options_div = document.querySelector("#config-timer-content");
let timer_options = document.querySelectorAll(".config-timer-button");

let speed_button = document.querySelector("#config-speed");
let speed_options_div = document.querySelector("#config-speed-content");
let speed_options = document.querySelectorAll(".config-speed-button");

let difficulty_button = document.querySelector("#config-difficulty");
let difficulty_options_div = document.querySelector("#config-difficulty-content");
let difficulty_options = document.querySelectorAll(".config-difficulty-button");

let lives_button = document.querySelector("#config-lives");
let lives_options_div = document.querySelector("#config-lives-content");
let lives_options = document.querySelectorAll(".config-lives-button");
// Maybe should provide a popup with input elements for 
// PEAK customisation
let custom_button = document.querySelector("#config-custom");

const config_bar = document.querySelectorAll(".config-bar button");
spawn_options_div.style.display = "none";
words_options_div.style.display = "none";
timer_options_div.style.display = "none";
speed_options_div.style.display = "none";
difficulty_options_div.style.display = "none";
lives_options_div.style.display = "none";

// Listening for button presses on the config bar
// to display its options
spawn_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);
    spawn_button.style.color = "#4b6f8d";
    if (spawn_options_div.style.display == "none") {
        spawn_options_div.style.display = "initial";
        contentDisplay(spawn_button, "none");
    } else if (spawn_options_div.style.display != "none") {
        spawn_options_div.style.display = "none";
        contentDisplay(spawn_button, "initial");
    }
});
words_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);
    words_button.style.color = "#4b6f8d";
    if (words_options_div.style.display == "none") {
        words_options_div.style.display = "initial";
        contentDisplay(words_button, "none");
    } else {
        words_options_div.style.display = "none";
        contentDisplay(words_button, "initial");
    }
});
timer_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);
    timer_button.style.color = "#4b6f8d";
    if (timer_options_div.style.display == "none") {
        timer_options_div.style.display = "initial";
        contentDisplay(timer_button, "none");
    } else {
        timer_options_div.style.display = "none";
        contentDisplay(timer_button, "initial");
    }
});
speed_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);
    speed_button.style.color = "#4b6f8d";
    if (speed_options_div.style.display == "none") {
        speed_options_div.style.display = "initial";
        contentDisplay(speed_button, "none");
    } else {
        speed_options_div.style.display = "none";
        contentDisplay(speed_button, "initial");
    }
});
difficulty_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);
    difficulty_button.style.color = "#4b6f8d";
    if (difficulty_options_div.style.display == "none") {
        difficulty_options_div.style.display = "initial";
        contentDisplay(difficulty_button, "none");
    } else {
        difficulty_options_div.style.display = "none";
        contentDisplay(difficulty_button, "initial");
    }
});
lives_button.addEventListener("click", () => {
    config_bar.forEach((button) => button.style.color = null);  
    lives_button.style.color = "#4b6f8d";
    if (lives_options_div.style.display == "none") {
        lives_options_div.style.display = "initial";
        contentDisplay(lives_button, "none");
    } else {
        lives_options_div.style.display = "none";
        contentDisplay(lives_button, "initial");
    }
});

function contentDisplay(id, display) {
    switch(id) {
        case spawn_button:
            words_button.style.display = display;
            timer_button.style.display = display;
            speed_button.style.display = display;
            lives_button.style.display = display
            difficulty_button.style.display = display;
            break;
        case words_button:
            lives_button.style.display = display;
            spawn_button.style.display = display;
            timer_button.style.display = display;
            speed_button.style.display = display;
            difficulty_button.style.display = display;
            break;
        case timer_button:
            lives_button.style.display = display;
            difficulty_button.style.display = display;
            spawn_button.style.display = display;
            words_button.style.display = display;
            speed_button.style.display = display;
            break;
        case speed_button:
            lives_button.style.display = display;
            difficulty_button.style.display = display;
            spawn_button.style.display = display;
            words_button.style.display = display;
            timer_button.style.display = display;
            break;
        case difficulty_button:
            lives_button.style.display = display;
            spawn_button.style.display = display;
            words_button.style.display = display;
            timer_button.style.display = display;
            speed_button.style.display = display;
            break;
        case lives_button:
            speed_button.style.display = display;
            difficulty_button.style.display = display;
            spawn_button.style.display = display;
            words_button.style.display = display;
            timer_button.style.display = display;
            break;
        default: break;
    }
}

let config;
// Fetches config.json and returns it as an object.
async function getConfig() {
    return fetch("includes/get_config-inc.php", {
        method: "POST"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Something went wrong.");
            }
            return response.json();
        }) 
        .then(json => json);
}



// checks if one was clicked to update the user's config.
function updateConfig(button, option) {
    button.addEventListener("click", async () => {
        // Indicates selected option with colours
        button.style.color = "#4b6f8d";
        config[option] = (option == "difficulty") ? button.textContent: parseFloat(button.textContent);
        fetch("includes/update_config-inc.php", {
            method: "POST",
            body: JSON.stringify(config),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.text());
    })
}

// Loops through all buttons with the same class name and
function checkClick(ele, option) {
    ele.forEach(button => updateConfig(button, option));
}

checkClick(spawn_options, "spawn");
checkClick(words_options, "words");
checkClick(timer_options, "timer");
checkClick(speed_options, "speed");
checkClick(lives_options, "lives");
checkClick(difficulty_options, "difficulty");

