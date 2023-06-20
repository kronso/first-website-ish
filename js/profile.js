async function getUserData() {
    return fetch("includes/profile_data-inc.php", {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => data);
}

// ele.replace(/-/g, "_").replace("#", "") changes the id of the element-
// to the equivalent key (I don't know if it's good to call your elements after your db's)
async function displayAverageData(ele, user_data) {
    // const data_div = ele.replace(/-/g, "_");
    document.querySelectorAll(`${ele} div`).forEach((div) => {
        switch(div.className) {
            case "average-gross-wpm":
                div.textContent = user_data[ele.replace(/-/g, "_").replace("#", "")]["gross_average"].toFixed(2);
                break;
            case "average-net-wpm":
                div.textContent = user_data[ele.replace(/-/g, "_").replace("#", "")]["net_average"].toFixed(2);
                break;
            case "average-accuracy":
                div.textContent = user_data[ele.replace(/-/g, "_").replace("#", "")]["acc_average"].toFixed(2) + "%";
                break;
            case "games-completed":
                div.textContent = user_data[ele.replace(/-/g, "_").replace("#", "")]["games_completed"];
                break;
            default: break;
        }
    });
}

// Displays users game data when they open their profile (name in header).
window.addEventListener("load", async () => {
    const user_data = await getUserData();
    displayAverageData("#total-data", user_data);
    displayAverageData("#falling-words-data", user_data);
    displayAverageData("#type-racer-data", user_data);
    displayAverageData("#walking-words-data", user_data);
});


