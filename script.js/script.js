"use strict";  //executes the js code globally

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

    function resetGame() {     //resets game to starting state
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

        if (codeGuess < 1 || codeGuess > 10 || isNaN(codeGuess)) {     //validates whether guess input is a number between 1 and 10, and provides alert message if entry is invalid
            alert("Please enter a number between 1 and 10.");
            return;
        }

        guessPrompt.classList.add("hidden");      //once a guess attempt is made, the starting prompt is hidden from view

        if (codeGuess === secretCode) {     //if user guess matches random number generated, win result section is made visible and lose result section is hidden from view
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

    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const notesInput = document.getElementById("notes");
    const contactMethodInputs = document.querySelectorAll("input[name='contactMethod']");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const notesError = document.getElementById("notesError");
    const contactMethodError = document.getElementById("contactMethodError");
    const confirmationMessage = document.getElementById("confirmationMessage");

    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const notesRegex = /^.{5,}$/;

    let attemptedSubmit = false;

    // --- Helper to get selected radio ---
    function getSelectedContactMethod() {
        for (let radio of contactMethodInputs) {
            if (radio.checked) return radio.value;
        }
        return null;
    }

    // --- Clear all errors ---
    function clearErrors() {
        [nameError, phoneError, emailError, notesError, contactMethodError].forEach(el => el.textContent = "");
        [nameInput, phoneInput, emailInput, notesInput].forEach(el => el.classList.remove("invalid"));
    }

    // --- Validation functions ---
    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            nameError.textContent = "First and last name are required.";
            nameInput.classList.add("invalid");
            return false;
        }
        if (!nameRegex.test(value)) {
            nameError.textContent = "Please enter a valid first and last name.";
            nameInput.classList.add("invalid");
            return false;
        }
        nameError.textContent = "";
        nameInput.classList.remove("invalid");
        return true;
    }

    function validateNotes() {
        const value = notesInput.value.trim();
        if (!notesRegex.test(value)) {
            notesError.textContent = "Please enter at least 5 characters.";
            notesInput.classList.add("invalid");
            return false;
        }
        notesError.textContent = "";
        notesInput.classList.remove("invalid");
        return true;
    }

    function validatePhone(selectedMethod) {
        const value = phoneInput.value.trim();
        const required = selectedMethod === "telegraph line" || selectedMethod === "telegraph line and electronic mail";

        if (required && !value) {
            phoneError.textContent = "Telegraph line is required.";
            phoneInput.classList.add("invalid");
            return false;
        }

        if (value && !phoneRegex.test(value)) {
            phoneError.textContent = "Telegraph line must be in ###-###-#### format.";
            phoneInput.classList.add("invalid");
            return false;
        }

        phoneError.textContent = "";
        phoneInput.classList.remove("invalid");
        return true;
    }

    function validateEmail(selectedMethod) {
        const value = emailInput.value.trim();
        const required = selectedMethod === "electronic mail" || selectedMethod === "telegraph line and electronic mail";

        if (required && !value) {
            emailError.textContent = "Electronic mailing address is required.";
            emailInput.classList.add("invalid");
            return false;
        }

        if (value && !emailRegex.test(value)) {
            emailError.textContent = "Please enter a valid electronic mailing address.";
            emailInput.classList.add("invalid");
            return false;
        }

        emailError.textContent = "";
        emailInput.classList.remove("invalid");
        return true;
    }

    // --- Live validation listeners ---
    nameInput.addEventListener("input", () => {
        if (attemptedSubmit) validateName();
    });
    notesInput.addEventListener("input", () => {
        if (attemptedSubmit) validateNotes();
    });
    phoneInput.addEventListener("input", () => {
        if (attemptedSubmit) validatePhone(getSelectedContactMethod());
    });
    emailInput.addEventListener("input", () => {
        if (attemptedSubmit) validateEmail(getSelectedContactMethod());
    });

    // --- Radio change validation ---
    contactMethodInputs.forEach(radio => {
        radio.addEventListener("change", () => {
            const selected = getSelectedContactMethod();
            contactMethodError.textContent = "";
            if (attemptedSubmit) {
                validatePhone(selected);
                validateEmail(selected);
            }
        });
    });

    // --- Form submit ---
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        attemptedSubmit = true;
        clearErrors();

        const selectedMethod = getSelectedContactMethod();
        let valid = true;

        if (!validateName()) valid = false;
        if (!validateNotes()) valid = false;

        if (!selectedMethod) {
            contactMethodError.textContent = "Please choose a preferred correspondence method.";
            valid = false;
        }

        if (!validatePhone(selectedMethod)) valid = false;
        if (!validateEmail(selectedMethod)) valid = false;

        if (!valid) return;

        // Successful submission
        attemptedSubmit = false;
        const caseData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            notes: notesInput.value.trim(),
            preferredContact: selectedMethod
        };

        confirmationMessage.textContent = `Thank you, ${caseData.name}. Case received. Investigation underway! We will contact you via ${caseData.preferredContact}. Your notes: ${caseData.notes}`;
        confirmationMessage.classList.remove("hidden");

        form.reset();
    });
});

