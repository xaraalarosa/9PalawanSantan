const quizData = [
    {
        question: "What symbol represents the start or end of a flowchart?",
        a: "Process",
        b: "Decision",
        c: "Terminator",
        d: "Input/Output",
        correct: "c"
    },
    {
        question: "Which symbol is used for decisions in a flowchart?",
        a: "Decision",
        b: "Process",
        c: "Flow Line",
        d: "Terminal",
        correct: "a"
    },
    {
        question: "Which escape sequence is used to create a new line in C programming?",
        a: "\\t",
        b: "\\n",
        c: "\\'",
        d: "\\\"",
        correct: "b"
    },
    {
        question: "What function does every C program start with?",
        a: "start()",
        b: "begin()",
        c: "main()",
        d: "function()",
        correct: "c"
    },
    {
        question: "What keyword is used to define an integer variable in C?",
        a: "int",
        b: "float",
        c: "char",
        d: "double",
        correct: "a"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
const resultsPage = document.getElementById('results-container');
const quizPage = document.getElementById('quiz-container');
const tryAgainButton = document.getElementById('try-again');

let currentQuestionIndex = 0;
let numCorrect = 0;
const incorrectAnswers = [];

function buildQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    const answers = [];
    for (letter in currentQuestion) {
        if (letter !== 'question' && letter !== 'correct') {
            answers.push(
                `<label>
                    <input type="radio" name="question" value="${letter}">
                    ${letter} :
                    ${currentQuestion[letter]}
                </label>`
            );
        }
    }
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join('')}</div>
    `;
}

function showResults() {
    const answerContainer = quizContainer.querySelector('.answers');
    const selector = `input[name=question]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (!userAnswer) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (userAnswer === quizData[currentQuestionIndex].correct) {
        numCorrect++;
    } else {
        incorrectAnswers.push(`Question ${currentQuestionIndex + 1}: ${quizData[currentQuestionIndex].question}`);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        buildQuiz();
    } else {
        quizPage.style.display = 'none';
        resultsPage.style.display = 'block';
        resultsContainer.innerHTML = `Score: ${numCorrect} out of ${quizData.length}<br><br>Incorrect Answers:<br>${incorrectAnswers.join('<br>')}`;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    numCorrect = 0;
    incorrectAnswers.length = 0;
    quizPage.style.display = 'block';
    resultsPage.style.display = 'none';
    buildQuiz();
}

buildQuiz();

submitButton.addEventListener('click', showResults);
tryAgainButton.addEventListener('click', restartQuiz);
