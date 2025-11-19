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
    question: "What makes Venus the hottest planet in the Solar System?",
    choice1: "Its thick atmosphere traps heat",
    choice2: "It is closest to the Sun",
    choice3: "Its surface is made of lava",
    choice4: "It rotates too slowly",
    answer: 1,
},
{
    question: "Which gas is most abundant in Venus’s atmosphere?",
    choice1: "Oxygen",
    choice2: "Carbon dioxide",
    choice3: "Hydrogen",
    choice4: "Nitrogen",
    answer: 2,
},
{
    question: "Why is Venus often called Earth's 'twin'?",
    choice1: "They have similar size and mass",
    choice2: "They formed at the same time",
    choice3: "They have the same atmosphere",
    choice4: "They rotate at similar speeds",
    answer: 1,
},
   {
    question: "What causes Venus to appear so bright in the sky?",
    choice1: "Its reflective clouds",
    choice2: "Its distance from Earth",
    choice3: "Its icy surface",
    choice4: "Its strong magnetic field",
    answer: 1,
},

{
    question: "How long is one day on Venus compared to Earth?",
    choice1: "Shorter than Earth",
    choice2: "About the same",
    choice3: "Longer than a Venusian year",
    choice4: "Exactly half an Earth day",
    answer: 3,
},
{
    question: "What is unusual about Venus’s rotation?",
    choice1: "It rotates backwards (retrograde)",
    choice2: "It rotates extremely fast",
    choice3: "It has no rotation",
    choice4: "It rotates in a square orbit",
    answer: 1,
},

{
    question: "What is the surface of Venus mostly made of?",
    choice1: "Liquid oceans",
    choice2: "Lava plains and volcanoes",
    choice3: "Ice and rock",
    choice4: "Metallic crystals",
    answer: 2,
},
{

    question: "What prevents humans from surviving on Venus’s surface?",
    choice1: "Extreme pressure and heat",
    choice2: "Lack of gravity",
    choice3: "Toxic oceans",
    choice4: "No sunlight",
    answer: 1,
},
{
    question: "What is the name of the thick clouds covering Venus?",
    choice1: "Methane clouds",
    choice2: "Ice crystal clouds",
    choice3: "Sulfuric acid clouds",
    choice4: "Hydrogen clouds",
    answer: 3,
},
{
    question: "Which spacecraft successfully landed on Venus and sent pictures?",
    choice1: "Voyager 1",
    choice2: "Venera 13",
    choice3: "New Horizons",
    choice4: "Pioneer 10",
    answer: 2,
    
},
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4

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
