// Handle "No" button moving away
function moveButton() {
    let button = document.getElementById("noButton");
    let container = document.querySelector(".container");

    let containerRect = container.getBoundingClientRect();
    let buttonRect = button.getBoundingClientRect();

    let maxX = containerRect.width - buttonRect.width - 10;
    let maxY = containerRect.height - buttonRect.height - 10;

    if (window.innerWidth <= 600) {
        maxX = window.innerWidth - buttonRect.width - 20;
        maxY = window.innerHeight - buttonRect.height - 20;
    }

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
}

// Handle image change for different buttons
function showHappyCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/happy-cat.gif" alt="Happy Cat" />
        <img src="images/happy-cat-2.gif" alt="Happy Cat" />
        <img src="images/happy-cat-3.gif" alt="Happy Cat" />
    `;
}

function showSadCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/sad-cat.gif" alt="Sad Cat" />
        <img src="images/sad-cat-2.gif" alt="Sad Cat" />
        <img src="images/sat-cat-3.gif" alt="Sad Cat" />
    `;
}

// Handle countdown and page redirection
function nextPage() {
    let header = document.querySelector(".header_text");
    let gifContainer = document.querySelector(".gif_container");
    let buttonsContainer = document.querySelector(".buttons");

    // Hide buttons
    buttonsContainer.style.display = "none";

    // Replace images with loading GIFs
    gifContainer.innerHTML = `
        <img src="images/loading-cat.gif" alt="Loading Cat" />
        <img src="images/loading-cat-2.gif" alt="Loading Cat" />
        <img src="images/loading-cat-3.gif" alt="Loading Cat" />
    `;

    let countdown = [3, 2, 1];
    countdown.forEach((num, index) => {
        setTimeout(() => {
            header.innerText = num;
        }, index * 1000);
    });

    // Redirect after countdown
    setTimeout(() => {
        window.location.href = "background-night-scenery.html"; // Change this if needed
    }, 3000);
}

// Handle button sounds
const yesSound = new Audio("yes-button.mp3");
const noSound = new Audio("no-button.mp3");

function playYesSound() {
    yesSound.currentTime = 0;
    yesSound.play();
}

function playNoSound() {
    noSound.currentTime = 0;
    noSound.play();
}

// Set fixed button texts
document.getElementById("yesButton").innerText = "Of course! I love surprises!";
document.getElementById("noButton").innerText = "Nope! I’m too scared! 😱";

// Event Listeners
document.getElementById("noButton").addEventListener("mouseover", moveButton);
document.getElementById("noButton").addEventListener("mouseover", showSadCats);
document.getElementById("noButton").addEventListener("mouseover", playNoSound);
document.getElementById("noButton").addEventListener("click", showSadCats);
document.getElementById("noButton").addEventListener("click", playNoSound);

document.getElementById("yesButton").addEventListener("mouseover", showHappyCats);
document.getElementById("yesButton").addEventListener("mouseover", playYesSound);
document.getElementById("yesButton").addEventListener("click", showHappyCats);
document.getElementById("yesButton").addEventListener("click", nextPage);
document.getElementById("yesButton").addEventListener("click", playYesSound);
