// Creates rows of data and appends them to the grid ".total-leaderboard"
function displayLeaderboard(leaderboard_data, column, selected_data) {
    const left_leaderboard_grid = document.querySelector(`.${column}`);
    let parent;
    let child;
    for (const player in leaderboard_data) {
        // Creates row that represents player's statistics
        parent = document.createElement("div"); 
        parent.className = "total-row";
        parent.style.backgroundColor = (player % 2 == 0) ? "#101213": null;

        // Creates the placements of user
        child = document.createElement("label");
        child.className = "position";
        parent.appendChild(child);
        child.textContent = parseInt(player) + 1;

        // Highlights the border for the top 3 players.
        switch(player) {
            case "0": parent.style.border = "1px solid rgba(109, 169, 149, 1)"; break;
            case "1": parent.style.border = "1px solid rgba(109, 169, 149, 0.66)"; break;
            case "2": parent.style.border = "1px solid rgba(109, 169, 149, 0.33)"; break;
        }

        for (const player_data in leaderboard_data[player]) {
            child = document.createElement("label");
            child.textContent = parseData(player_data, leaderboard_data[player][player_data]);
            child.style.color = null;
            if (player_data == selected_data) {
                console.log(player_data);
                console.log(leaderboard_data[player])
                child.style.color = "#4b6f8d";
            }
            parent.appendChild(child);
        }
        left_leaderboard_grid.appendChild(parent);
    }
}
// Changes button content to the equivalent column names of the db
function parseText(data) {
    switch (data) {
        case "name": return "username"
        case "gross": return "gross_wpm";
        case "net": return "net_wpm";
        case "accuracy": return "accuracy";
        case "games": return "games_completed";
    }
}
// Changes button content to depending on the data given
function parseData(player_data, data) {
    switch (player_data) {
        case "username": return data;
        case "gross_wpm": return parseFloat(data).toFixed(2);
        case "net_wpm": return parseFloat(data).toFixed(2);
        case "accuracy": return parseFloat(data).toFixed(2) + "%";
        case "games_completed": return data;
    }
}
// Refreshes board if the user presses a button
async function clearBoard(column) {
    document.querySelectorAll(`.${column} .total-row`).forEach((row) => {
        row.remove();
    });
}

/*
*
*
*       LEFT-SIDE LEADERBOARD
*
*/
// Loads net_wpm as defualt on load
window.addEventListener("load", async () => {
    // Indicates the set default option using a colour
    document.querySelectorAll(".buttons-left .order")[0].style.color = "#4b6f8d";
    // Requests data from database
    const leaderboard_data = 
        await fetch("includes/leaderboard-inc.php", {
            method: "POST",
            body: JSON.stringify({data: "net_wpm", database: "average_combined_data"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
    displayLeaderboard(leaderboard_data, "total-leaderboard", selected_data_left);
});
let selected_data_left = "net_wpm";
// Changes the leaderboard depending on the data option chosen
document.querySelectorAll(".buttons-left .order").forEach((button) => {
    button.addEventListener("click", async () => {
        document.querySelectorAll(".buttons-left .order").forEach((button) => button.style.color = null);
        const leaderboard_data =
        await fetch("includes/leaderboard-inc.php", {
            method: "POST",
            body: JSON.stringify({ data: parseText(button.textContent), database:"average_combined_data" }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())

        await clearBoard("total-leaderboard");
        selected_data_left = parseText(button.textContent);
        displayLeaderboard(leaderboard_data, "total-leaderboard", selected_data_left);

        button.style.color = "#4b6f8d";
    })
});

/*
*
*
*       RIGHT-SIDE LEADERBOARD
*
*/
// Loads net_wpm as defualt on load
window.addEventListener("load", async () => {
    document.querySelectorAll(".buttons-right .order")[0].style.color = "#4b6f8d";
    const leaderboard_data = 
        await fetch("includes/leaderboard-inc.php", {
            method: "POST",
            body: JSON.stringify({data: "net_wpm", database: "average_type_racer_data"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
    displayLeaderboard(leaderboard_data, "any-leaderboard", selected_data_right);
});

// default selected modes when page is loaded for the left side leaderboard
let selected_mode = "type_racer";
let selected_data_right = "net_wpm";
document.querySelectorAll(".select-leaderboard button")[1].style.color  = "#4b6f8d";
document.querySelectorAll(".select-leaderboard button").forEach((button) => {
    button.addEventListener("click", async ()=> {
    document.querySelectorAll(".select-leaderboard button").forEach((button) => button.style.color = null);
        const leaderboard_data = 
        await fetch("includes/leaderboard-inc.php", {
            method: "POST",
            body: JSON.stringify({data: selected_data_right, database: "average_" + button.textContent.replace(/-/g, "_") + "_data"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
        await clearBoard("any-leaderboard");
        displayLeaderboard(leaderboard_data, "any-leaderboard", selected_data_right);
        selected_mode = button.textContent.replace(/-/g, "_"); 

        button.style.color = "#4b6f8d";
    });
});
document.querySelectorAll(".buttons-right .order").forEach((button) => {
    button.addEventListener("click", async () => {
        document.querySelectorAll(".buttons-right .order").forEach((button) => button.style.color = null);
        const leaderboard_data =
        await fetch("includes/leaderboard-inc.php", {
            method: "POST",
            body: JSON.stringify({ data: parseText(button.textContent), database: "average_" + selected_mode + "_data"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())

        await clearBoard("any-leaderboard");
        selected_data_right = parseText(button.textContent);
        displayLeaderboard(leaderboard_data, "any-leaderboard", selected_data_right);
        button.style.color = "#4b6f8d";
    });
});