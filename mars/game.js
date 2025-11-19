const question =document.querySelector('#question');
const choices =Array.from(document.querySelectorAll('.choice-text'));
const progressText =document.querySelector('#progressText');
const scoreText =document.querySelector('#score');
const progressBarFull =document.querySelector('#progressBarFull');  

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuesions = []

let questions = [
    {
        question: "Which planet is the fourth from the Sun?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Venus",
        answer: 2,
    },
    {
        question: "Why is Mars known as the “Red Planet?",
        choice1: "Because it has active volcanoes",
        choice2: "Because its sky is red",
        choice3: "Because it's very close to the Sun",
        choice4: "Because its surface contains iron oxides",
        answer: 4,
    },
    {

        question: "How long is a day on Mars (a sol)?",
        choice1: "48 hours",
        choice2: "12 hours an 10 minutes",
        choice3: "24 hours and 37 minutes",
        choice4: "10 hours",
        answer: 3,
    },
    {
        question: "How long does it take to travel from Earth to Mars with the current technology?",
        choice1: "6 to 9 months",
        choice2: "1 and a half years",
        choice3: "2 weeks",
        choice4: "3 months",
        answer: 1,
    },
    {
    question: "Which planet is closest to Mars?",
    choice1: "Venus",
    choice2: "Neptune",
    choice3: "Jupiter",
    choice4: "Saturn",
    answer: 3,
    },
    {
        question: "What type of spacecraft was used in NASA’s 2021 Perseverance mission to land on Mars?",
        choice1: "A crewed capsule",
        choice2: "A reusable rocket",
        choice3: "A rover with a 'sky crane' landing system",
        choice4: "A solar drone",
        answer: 3,
    },
    {
        question: "During the trip, astronauts must protect themselves mainly from:",
        choice1: "Cold temperatures in space",
        choice2: "Solar storms and cosmic radiation",
        choice3: "Lack of oxygen",
        choice4: "Large meteorites",
        answer: 2,
    },

    {
        question: "What is the name of the tallest volcano on Mars — the largest in the Solar System?",
        choice1: "Mount Areion",
        choice2: "Mount Everest",
        choice3: "Mount Gale",
        choice4: "Olympus Mons",
        answer: 4,
    },

    {
        question: "What evidence have missions found that water once existed on Mars?",
        choice1: "Cracks filled with frozen gas",
        choice2: "Ammonia glaciers",
        choice3: "Riverbeds and hydrated minerals",
        choice4: "Permanent clouds",
        answer: 3,
    },
    {
    question: "What is the main goal of current Mars missions?",
    choice1: "Search for signs of past or present life",
    choice2: "Find precious metals",
    choice3: "Bring back rocks for decoration",
    choice4: "Build a commercial base",
    answer: 1,
},


];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    if(availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('endgames.html');
    }   
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    const questionsIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionsIndex, 1);
    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
       
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
    });
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();
