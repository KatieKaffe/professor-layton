"use strict";  //executes the js code globally by being at the very top

document.addEventListener("DOMContentLoaded", () => {

    // Light and Dark Mode
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {   //listens for click on dark mode button
            document.body.classList.toggle('dark-mode');    //toggles to add a class of dark-mode when clicked, returns it to its original classless state when clicked again
        });
    }

    // Return to Top
    const returnToTopBtn = document.getElementById("returnToTop");

    if (returnToTopBtn) {
        window.addEventListener("scroll", () => {    //makes a return to top button appear once the user has scrolled past 300px down the page 
            returnToTopBtn.style.display =
                window.scrollY > 300 ? "flex" : "none";
        });

        returnToTopBtn.addEventListener("click", () => {    //listens to click on return to top button and resets page back to top, with smooth make it a more fluid change
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    //Game Collection Product Switcher
    const gameBtns = document.querySelectorAll(".game-buttons button");
    const gameBios = document.querySelectorAll(".game-bio");

    gameBtns.forEach(button => {
        button.addEventListener("click", () => {    //listens for a game collection button to be clicked
            const gameId = button.dataset.game;

            gameBios.forEach (bio => bio.classList.remove("active"));     //removes active class to hide game bios from view
            gameBtns.forEach (btn => btn.classList.remove("active"));     //removes active class to reset game collection buttons

            document.getElementById(gameId).classList.add("active");     //adds active class to make selected game bio viewable
            button.classList.add("active");     //adds active class to show the clicked button as active
        });
    });

    //Curious Code Challenge guessing game
    function getRandomNumber(min, max) {     //function that generates a random number between 1 and 10, including 1 and 10
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let secretCode = getRandomNumber(1, 10);
    let gameActive = true;

    const codeBtn = document.getElementById("attemptCode");
    const guessInput = document.getElementById("guessInput");
    const guessPrompt = document.getElementById("guessPrompt");
    const winResult = document.getElementById("winResult");
    const loseResult = document.getElementById("loseResult");
    const winNumber = document.getElementById("winNumber");
    const loseNumber = document.getElementById("loseNumber");

    function resetGame() {     //Resets game to starting state
        secretCode = getRandomNumber (1, 10);
        console.log("New Secret Code: ", secretCode);

        guessPrompt.classList.remove("hidden");     //makes starting game prompt visible
        winResult.classList.add("hidden");     //hides win result section
        loseResult.classList.add("hidden");     //hides lose result section
        guessInput.value = "";      //resets input field to a blank state
        codeBtn.textContent = "Attempt the Code";      //resets button name to starting state
        gameActive = true;     //starts a new game
    }

    function attemptCode () {    //function that determines whether the game is active or not, and resets it to a new game if the game is inactive
        if (!gameActive) {
            resetGame();
            return;
        }

        const codeGuess = Number(guessInput.value);

        if (codeGuess < 1 || codeGuess > 10 || isNaN(codeGuess)) {     //evaluates what is entered in the guess input field to make sure it is a valid entry, and provides error message if entry is invalid
            alert("Please enter a number between 1 and 10.");
            return;
        }

        guessPrompt.classList.add("hidden");      //once a guess attempt is made, the starting prompt is hidden from view

        if (codeGuess === secretCode) {.     //if user guess matches random number generated, win result section is made visible and lose result section is hidden from view
            winResult.classList.remove("hidden");
            loseResult.classList.add("hidden");
            winNumber.textContent = secretCode;     //reveals random number generated
        } else {
            loseResult.classList.remove("hidden");    //if user guess does not match random number generated, lose result section is made visible and win result section is hidden view
            winResult.classList.add("hidden");
            loseNumber.textContent = secretCode;     //reveals random number generated
        }

        codeBtn.textContent = "Reset";     //after a guess is made and a result is given, the Attempt the Code button becomes a Reset button
        gameActive = false;      //after a guess is made and a result is given, the game ends; new game can start once reset
    }

    if (codeBtn) {      //listens for click on Attempt the Code/Reset button
    codeBtn.addEventListener("click", attemptCode);
    }

});

