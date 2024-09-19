const story = {
    start: {
        text: "Welcome to Algebria!",
        image: "algebria.png",
        choices: [
            { text: "Start Quest", next: "begin" },
        ]
    },
    begin: {
        text: "You encounter a strange gate. To open it, solve this equation: x² - 5x + 6 = 0. What is one of the solutions for x?",
        image: "gate.jpg",
        choices: [
            { text: "Submit Answer", next: "checkEquationBegin" }
        ],
        equation: {
            question: "x² - 5x + 6 = 0",
            correctAnswers: [2, 3], // Both roots for this equation
        }
    },
    correct: {
        text: "Correct! *The gate opens*, wow its beautiful inside, should we move forward?",
        image: "room.jpg",
        choices: [
            { text: "Continue", next: "nextStage" },
            { text: "Go Back Home", next: "start" }
        ]
    },
    incorrectBegin: {
        text: "Incorrect! The gate remains closed. Try again.",
        image: "gate.jpg",
        choices: [
            { text: "Try Again", next: "begin" },
        ]
    },
    timeout: {
        text: "Time's up! You failed to solve the equation in time.",
        image: "closed_gate.jpg",
        choices: [
            { text: "Try Again", next: "begin" },
        ]
    },
    nextStage: {
        text: "There are 4 doors. Which will you choose?",
        image: "doors.png",
        choices: [
            { text: "door 1", next: "door1" },
            { text: "door 2", next: "door2" },
            { text: "door 3", next: "door3" },
            { text: "door 4", next: "door4" },
        ]
    },
    door1: {
        text: "It's Locked",
        image: "lock.jpg",
        choices: [
            { text: "Enter Password", next: "checkEquationDoor1" }
        ],
        equation: {
            question: "Solve the quadratic equation: 2x² + 3x - 2 = 0",
            correctAnswers: [0.5, -2] // Both roots for this equation
        }
    },
    correct1: {
        text: "Correct! *The door opens*, it's dark.",
        image: "door1.jpg",
        choices: [
            { text: "Go Back", next: "nextStage" },
            { text: "Go deeper", next: "room1" }
        ]
    },
    incorrectDoor1: {
        text: "Incorrect! The door remains locked. Try again.",
        image: "lock.jpg",
        choices: [
            { text: "Try Again", next: "door1" },
            { text: "Give up", next: "nextStage" },
        ]
    }
};

// Function to update the game content
function displayStory(stage) {
    const storyDiv = document.getElementById('story');
    const choicesDiv = document.getElementById('choices');
    const imgDiv = document.querySelector('.img');
    const timerDiv = document.getElementById('timer');
    
    // Update the text and image
    storyDiv.innerHTML = `<div class="story-text">${stage.text}</div>`;
    imgDiv.innerHTML = `<img src="${stage.image}" alt="story image">`;
    
    // Clear previous choices
    choicesDiv.innerHTML = '';
    
    // If the stage has choices, display them
    if (stage.choices) {
        stage.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.classList.add('choice-button');
            button.onclick = () => handleChoice(choice.next);
            choicesDiv.appendChild(button);
        });
    }

    // Show input for equation stage
    if (stage.equation) {
        document.getElementById('answer-container').style.display = 'block';
        timerDiv.style.display = 'block';  // Show the timer
        startTimer(30, () => handleChoice("timeout"));  // Start 30-second timer
    } else {
        document.getElementById('answer-container').style.display = 'none';
        timerDiv.style.display = 'none';  // Hide the timer if not needed
    }
}

// Timer function to update the timer display
function startTimer(duration, onTimeUp) {
    const timerDiv = document.getElementById('timer');
    let timer = duration;
    
    const interval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(interval);
            onTimeUp();  // Trigger when time runs out
        } else {
            timerDiv.innerHTML = `Time left: ${timer}s`;
            timer--;
        }
    }, 1000);
}

// Handle user's choice
function handleChoice(nextStage) {
    if (nextStage.startsWith("checkEquation")) {
        const userInput = document.getElementById('answer-input').value;
        checkAnswer(userInput, nextStage);
    } else {
        displayStory(story[nextStage]);
    }
}

// Function to check if the answer is correct
function checkAnswer(userInput, nextStage) {
    let currentStage;
    
    if (nextStage === "checkEquationBegin") {
        currentStage = story["begin"];
    } else if (nextStage === "checkEquationDoor1") {
        currentStage = story["door1"];
    }
    
    const { correctAnswers } = currentStage.equation;
    if (correctAnswers.includes(Number(userInput))) {
        if (nextStage === "checkEquationBegin") {
            displayStory(story["correct"]);
        } else if (nextStage === "checkEquationDoor1") {
            displayStory(story["correct1"]);
        }
    } else {
        if (nextStage === "checkEquationBegin") {
            displayStory(story["incorrectBegin"]);
        } else if (nextStage === "checkEquationDoor1") {
            displayStory(story["incorrectDoor1"]);
        }
    }
}

// Start the game
displayStory(story["start"]);

// Handle the "Submit Answer" button
document.getElementById('submit-answer').onclick = () => handleChoice("checkEquationBegin");
