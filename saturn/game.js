const question =document.querySelectorAll('#question');
const choices =document.querySelectorAll('.choice-text');
const progressText =document.getElementById('#progressText');
const scoreText =document.getElementById('#score');
const progressBarFull =document.getElementById('#progressBarFull');  

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "¿Which planet is known as the Red Planet?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Venus",
        answer: 2,
    },
    {
        question: "¿Which planet has the most moons?",
        choice1: "Saturn",      
        choice2: "Jupiter",
        choice3: "Uranus",
        choice4: "Neptune",
        answer: 1,
    },
    {
        question: "¿What is the largest planet in our solar system?",
        choice1: "Saturn",
        choice2: "Jupiter",
        choice3: "Neptune",
        choice4: "Earth",
        answer: 2,
    },
    {
        question: "¿What is the largest planet in our solar system?",
        choice1: "Saturn",
        choice2: "Jupiter",
        choice3: "Neptune",
        choice4: "Earth",
        answer: 2,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('saturnask.html');
    }   
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    const questionsIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionsIndex];
    question.innerText = currentQuestion.question;

}