const questions = [
    {
        question: "JavaScript-те айнымалыны қалай жариялаймыз?",
        options: ["var", "let", "const", "Барлығы дұрыс"],
        answer: 3 // Барлығы дұрыс
    },
    {
        question: "JavaScript-те функцияны қалай жариялаймыз?",
        options: [
            "function myFunction() {}",
            "def myFunction() {}",
            "func myFunction() {}",
            "function: myFunction() {}"
        ],
        answer: 0 // function myFunction() {}
    },
    {
        question: "JavaScript-те массивті қалай құруға болады?",
        options: [
            "var arr = [];",
            "var arr = {};",
            "var arr = ();",
            "var arr = <>;"
        ],
        answer: 0 // var arr = [];
    },
    {
        question: "JavaScript-те циклды қалай жазамыз?",
        options: [
            "for (var i = 0; i < 10; i++) {}",
            "loop (var i = 0; i < 10; i++) {}",
            "repeat (var i = 0; i < 10; i++) {}",
            "while (var i = 0; i < 10; i++) {}"
        ],
        answer: 0 // for (var i = 0; i < 10; i++) {}
    },
    {
        question: "JavaScript-те объектіні қалай құруға болады?",
        options: [
            "var obj = {};",
            "var obj = [];",
            "var obj = ();",
            "var obj = <>;"
        ],
        answer: 0 // var obj = {};
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const questionContainer = document.getElementById("question-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");
const questionProgressEl = document.getElementById("question-progress");

function startTimer() {
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goToNextQuestion();
        }
    }, 1000);
}

function updateProgress() {
    questionProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function loadQuestion() {
    updateProgress();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.forEach((btn, index) => {
        btn.textContent = currentQuestion.options[index];
        btn.onclick = () => selectAnswer(index);
    });
}

function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const correctIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        score++;
    }
    optionsEl.forEach((btn, index) => {
        btn.disabled = true;
        btn.style.backgroundColor = index === correctIndex ? "lightgreen" : "lightcoral";
    });
    nextBtn.classList.remove("hide");
}

function goToNextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        optionsEl.forEach(btn => {
            btn.disabled = false;
            btn.style.backgroundColor = "";
        });
        nextBtn.classList.add("hide");
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreEl.textContent = score;
}

nextBtn.addEventListener("click", goToNextQuestion);

restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    loadQuestion();
});

loadQuestion();