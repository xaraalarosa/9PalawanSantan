const questions = [
    {
        type: 'multiple-choice',
        image: 'path/to/question1.jpg',
        answers: [
            { text: "Answer 1", correct: true },
            { text: "Answer 2", correct: false },
            { text: "Answer 3", correct: false },
            { text: "Answer 4", correct: false }
        ]
    },
    {
        type: 'identification',
        image: 'path/to/question2.jpg',
        correctAnswer: "Correct Answer"
    },
    // Add more questions here
];

const questionContainer = document.getElementById('question-container');
const backgroundImage = document.getElementById('background-image');
const answerButtonsElement = document.getElementById('answer-buttons');
const answerInputElement = document.getElementById('answer-input');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultBackground = document.getElementById('result-background');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    backgroundImage.style.backgroundImage = `url(${question.image})`;
    if (question.type === 'multiple-choice') {
        answerButtonsElement.classList.remove('hide');
        answerInputElement.classList.add('hide');
        answerButtonsElement.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    } else if (question.type === 'identification') {
        answerButtonsElement.classList.add('hide');
        answerInputElement.classList.remove('hide');
        answerInputElement.value = '';
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', () => {
            checkIdentificationAnswer(question.correctAnswer);
        }, { once: true });
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function checkIdentificationAnswer(correctAnswer) {
    const userAnswer = answerInputElement.value.trim().toLowerCase();
    if (userAnswer === correctAnswer.toLowerCase()) {
        score++;
    }
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    const scorePercentage = (score / questions.length) * 100;
    if (scorePercentage >= 70) {
        resultBackground.style.backgroundImage = 'url(quiz/bgresources/.jpg)';
    } else {
        resultBackground.style.backgroundImage = 'url(path/to/fail.jpg)';
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide');
});

restartButton.addEventListener('click', startGame);

startGame();
