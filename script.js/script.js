"use strict";  //executes the js code globally

document.addEventListener("DOMContentLoaded", () => {

/*-------------------- LIGHT/DARK MODE --------------------*/

    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {   //listens for click on dark mode button
            document.body.classList.toggle('dark-mode');    //toggles to add a class of dark-mode when clicked, returns it to its original classless state when clicked again
        });
    }

/*-------------------- RETURN TO TOP --------------------*/

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

/*-------------------- GAME COLLECTION PRODUCT SWITCHER --------------------*/

    const gameBtns = document.querySelectorAll(".game-buttons button");
    const gameBios = document.querySelectorAll(".game-bio");

    gameBtns.forEach(button => {     //loops through each game button
        button.addEventListener("click", () => {    //listens for a game button to be clicked
            const gameId = button.dataset.game;

            gameBios.forEach (bio => bio.classList.remove("active"));     //loops through each game bio and removes active class to hide game bios from view
            gameBtns.forEach (btn => btn.classList.remove("active"));     //loops through each game button and removes active class to reset game collection buttons

            document.getElementById(gameId).classList.add("active");     //adds active class to make selected game bio viewable
            button.classList.add("active");     //adds active class to show the clicked button as active
        });
    });

/*-------------------- CURIOUS CODE CHALLENGE GUESSING GAME --------------------*/

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

        if (codeGuess === secretCode) {     //if user guess matches random number generated
            winResult.classList.remove("hidden");    //win result section is made visible
            loseResult.classList.add("hidden");      //lose result section is hidden from view
            winNumber.textContent = secretCode;     //reveals random number generated
        } else {      //if user guess does not match random number generated
            loseResult.classList.remove("hidden");    //lose result section is made visible
            winResult.classList.add("hidden");      //win result section is hidden view
            loseNumber.textContent = secretCode;     //reveals random number generated
        }

        codeBtn.textContent = "Reset";     //after a guess is made and a result is given, the Attempt the Code button becomes a Reset button
        gameActive = false;      //after a guess is made and a result is given, the game ends; new game can start once reset
    }

    if (codeBtn) {      //listens for click on Attempt the Code/Reset button
    codeBtn.addEventListener("click", attemptCode);
    }

    /*-------------------- CONTACT FORM --------------------*/

    const form = document.getElementById("contactForm");     //variables to get whole contact form element, each input field, radio buttons
    const nameInput = document.getElementById("name");       
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const notesInput = document.getElementById("notes");
    const contactMethodInputs = document.querySelectorAll("input[name='contactMethod']");

    const nameError = document.getElementById("nameError");      //variables to get spans for error messages and confirmation message
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const notesError = document.getElementById("notesError");
    const contactMethodError = document.getElementById("contactMethodError");
    const confirmationMessage = document.getElementById("confirmationMessage");

    const nameRegex = /^[A-Za-z\s'-]{2,}$/;       //regex requiring name to have at least 2 characters and only letters, spaces, apostrophes, or hyphens
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;       //regex requiring email to be email@domain.com format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;        //regex requiring phone to be in ###-###-#### format
    const notesRegex = /^.{5,}$/;       //regex requiring notes to contain a minimum of 5 characters

    let attemptedSubmit = false;      //variable to determine if form submission attempt has been made


    function getSelectedContactMethod() {      //function that determines which radio button for contact method has been selected
        for (let radio of contactMethodInputs) {
            if (radio.checked) return radio.value;     //returns chosen contact method
        } 
        return null;      //returns nothing is none are selected
    }


    function clearErrors() {     //function that clears all error messages and removes invalid class state (red outline)
        [nameError, phoneError, emailError, notesError, contactMethodError].forEach(el => el.textContent = "");
        [nameInput, phoneInput, emailInput, notesInput].forEach(el => el.classList.remove("invalid"));
    }


    function validateName() {      //function that validates the name input
        const value = nameInput.value.trim();      //removes any whitespace around input
        if (!value) {     //if field is left blank
            nameError.textContent = "First and last name are required.";     //display error message
            nameInput.classList.add("invalid");     //apply red outline to input field
            return false;
        }
        if (!nameRegex.test(value)) {     //if input does not comply with regex requirement
            nameError.textContent = "Please enter a valid first and last name.";     //display error message
            nameInput.classList.add("invalid");     //apply red outline to input field
            return false;
        }
        nameError.textContent = "";     //otherwise display no error message
        nameInput.classList.remove("invalid");     //remove red outline from input field
        return true;
    }

    function validatePhone(selectedMethod) {      //function that validates phone number input
        const value = phoneInput.value.trim();      //removes any whitespace around input
        const required = selectedMethod === "telegraph line" || selectedMethod === "telegraph line and electronic mail";  //determines whether phone number field is required based on contact method selection

        if (required && !value) {      //if phone number field is required and the input field is left blank
            phoneError.textContent = "Telegraph line is required.";     //display error message
            phoneInput.classList.add("invalid");      //apply red outline to input field
            return false;
        }

        if (value && !phoneRegex.test(value)) {      //if phone number field has an input but it does not comply with regex format
            phoneError.textContent = "Telegraph line must be in ###-###-#### format.";     //display error message
            phoneInput.classList.add("invalid");      //apply red outline to input field
            return false;
        }

        phoneError.textContent = "";     //otherwise display no error message
        phoneInput.classList.remove("invalid");      //remove red outline from input field
        return true;
    }

    function validateEmail(selectedMethod) {      //function that vailidates email address input
        const value = emailInput.value.trim();     //removes any whitespace around input
        const required = selectedMethod === "electronic mail" || selectedMethod === "telegraph line and electronic mail";  //determines whether email address field is required based on contact method selection

        if (required && !value) {     //if email address field is required and the input is left blank
            emailError.textContent = "Electronic mailing address is required.";      //display error message
            emailInput.classList.add("invalid");       //apply red outline to input field
            return false;
        }

        if (value && !emailRegex.test(value)) {      //if email address has an input but it does not comply with regex format
            emailError.textContent = "Please enter a valid electronic mailing address.";      //display error message
            emailInput.classList.add("invalid");     //apply red outline to input field
            return false;
        }

        emailError.textContent = "";     //otherwise display no error message
        emailInput.classList.remove("invalid");     //remove red outline from input field
        return true;
    }

        function validateNotes() {      //function that validates notes input
        const value = notesInput.value.trim();      //removes any whitespace around input
        if (!notesRegex.test(value)) {     //if notes input does not comply with regex format
            notesError.textContent = "Please enter at least 5 characters.";      //display error message
            notesInput.classList.add("invalid");     //apply red outline to input field
            return false;
        }
        notesError.textContent = "";     //otherwise display no error message
        notesInput.classList.remove("invalid");     //remove red outline from input field
        return true;
    }

    nameInput.addEventListener("input", () => {     //after submission attempt, validates name input while user is typing new input
        if (attemptedSubmit) validateName();
    });

    phoneInput.addEventListener("input", () => {      //after submission attempt, validates phone number input while user is typing new input
        if (attemptedSubmit) validatePhone(getSelectedContactMethod());
    });

    emailInput.addEventListener("input", () => {     //after submission attempt, validates email address input while user is typing new input
        if (attemptedSubmit) validateEmail(getSelectedContactMethod());
    });

    notesInput.addEventListener("input", () => {     //after submission attempt, validates notes input while user is typing new input
        if (attemptedSubmit) validateNotes();
    });

    contactMethodInputs.forEach(radio => {      //loops through each radio button in contact method options
        radio.addEventListener("change", () => {     //listens for when a different contact method is selected
            const selected = getSelectedContactMethod();    //runs function that determines which contact method is selected 
            contactMethodError.textContent = "";     //clears error message for contact method section
            if (attemptedSubmit) {    //if a form submission attempt has already been made
                validatePhone(selected);    //run phone number validation again based on new selected contact method
                validateEmail(selected);    //run email address validation again based on new selected contact method
            }
        });
    });

    form.addEventListener("submit", function(event) {      ;//listens for a contact form submission
        event.preventDefault();    //prevents default browser behavior for this event
        attemptedSubmit = true;     //user has attempted to submit the contact form
        clearErrors();     //runs function that clears error messages/states

        const selectedMethod = getSelectedContactMethod();    //gets currently selected contact method
        let valid = true;

        if (!validateName()) valid = false;    //runs validation of name input, and if it returns false the form is marked invalid
        if (!validateNotes()) valid = false;      //runs validation of notes input, and if it returns false the form is marked invalid

        if (!selectedMethod) {     //if no contact method is selected
            contactMethodError.textContent = "Please choose a preferred correspondence method.";      //displays error message
            valid = false;
        }

        if (!validatePhone(selectedMethod)) valid = false;    //runs validation of phone number input based on selected contact method, and if it returns false the form is marked invalid     
        if (!validateEmail(selectedMethod)) valid = false;    //runs validation of phone number input based on selected contact method, and if it returns false the form is marked invalid

        if (!valid) return;    //if any invalid results, form submission process stops

        attemptedSubmit = false;     //ends live validation process
            const caseData = {     //object that stores inputted data from user
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                notes: notesInput.value.trim(),
                preferredContact: selectedMethod
            };

            confirmationMessage.textContent = `Thank you, ${caseData.name}. Case received. Investigation underway! We will contact you via ${caseData.preferredContact}. Your notes: ${caseData.notes}`;    //confirmation message that reiterates what the user entered
            confirmationMessage.classList.remove("hidden");     //makes confirmation message visible

            form.reset();     //resets the contact form to default state
    });
});

/* References:

Color scheme: imagecolorpicker.com

Images: 
Box Covers - Professor Layton Wiki at layton.fandom.com
Hero Image - https://wall.alphacoders.com/big.php?i=558703
About Image - https://wallpaper.mob.org/pc/image/video_game-professor_layton-1452059.html
Professor Layton Icons (guessing game) - https://www.pinterest.com/pin/7740630600078970/
Light Mode Logo - https://www.hiclipart.com/free-transparent-background-png-clipart-quufv
Dark Mode Logo - https://www.deviantart.com/honokawa/art/Logo-Profesor-Layton-189937035

Code validators:
https://validator.w3.org/
https://jigsaw.w3.org/css-validator/#validate_by_input
https://www.minifier.org/javascript-validator

Coding Resources:
W3Schools
MDN Web Docs
Stack Overflow
zyBook for GIT 417
CodePen Exercises for GIT 417
YouTube
regexr.com
ChatGPT (troubleshooting errors, regex assistance)
*/