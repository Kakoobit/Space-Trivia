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
        question: "Which planes is closest to the Sun?",
        choice1: "Mercury",
        choice2: "Venus",
        choice3: "Mars",
        choice4: "Earth",
        answer: 1,

    },
    {
        question: "Why is Mercury so difficult to observe from Earth?",
        choice1: "It’s always close to the Sun in the sky",
        choice2: "It has thick clouds that block the light",
        choice3: "It’s hidden behind the Moon",
        choice4: "It’s too small to reflect sunlight",
        answer: 1,
    },
{
    question: "How long does Mercury take to complete one orbit around the Sun?",
    choice1: "120 days",
    choice2: "88 days",
    choice3: "225 days",
    choice4: "365 days",
    answer: 2,
    },
{
    question: "How long does Mercury take to complete one orbit around the Sun?",
    choice1: "120 days",
    choice2: "88 days",
    choice3: "225 days",
    choice4: "365 days",
    answer: 2,
},
{
    question: "Which of these planets has no moons?",
    choice1: "Mercury",
    choice2: "Earth",
    choice3: "Mars",
    choice4: "Jupiter",
    answer: 1,
},

{
    question: "Why is Mercury so difficult to observe from Earth?",
    choice1: "It’s always close to the Sun in the sky",
    choice2: "It has thick clouds that block the light",
    choice3: "It’s hidden behind the Moon",
    choice4: "It’s too small to reflect sunlight",
    answer: 1,
},

{
    question: "What is Mercury’s surface mostly covered with?",
    choice1: "Smooth plains and impact craters",
    choice2: "Thick volcanic ash",
    choice3: "Ice and sand dunes",
    choice4: "Oceans of lava",
    answer: 1,
},
{
    question: "What spacecraft provided the most detailed images of Mercury so far?",
    choice1: "Voyager 2",
    choice2: "MESSENGER",
    choice3: "Mariner 9",
    choice4: "New Horizons",
    answer: 2,
},

{
    question: "Why are the temperature changes on Mercury so extreme?",
    choice1: "It rotates very quickly",
    choice2: "It’s covered in ice",
    choice3: "It has almost no atmosphere to trap heat",
    choice4: "It’s tilted away from the Sun",
    answer: 3,
},

{
    question: "Which side of Mercury is hottest?",
    choice1: "The poles",
    choice2: "The equator",
    choice3: "The night side",
    choice4: "The side facing the Sun",
    answer: 4,
},

{
    question: "What is the main goal of the European-Japanese mission BepiColombo?",
    choice1: "To test solar panels near the Sun",
    choice2: "To search for water under Mercury’s surface",
    choice3: "To study Mercury’s magnetic field and surface",
    choice4: "To collect rock samples and bring them back",
    answer: 3,
},

{
    question: "Which side of Mercury is hottest?",
    choice1: "The poles",
    choice2: "The equator",
    choice3: "The night side",
    choice4: "The side facing the Sun",
    answer: 4,
},

{
    question: "What is the main goal of the European-Japanese mission BepiColombo?",
    choice1: "To test solar panels near the Sun",
    choice2: "To search for water under Mercury’s surface",
    choice3: "To study Mercury’s magnetic field and surface",
    choice4: "To collect rock samples and bring them back",
    answer: 3,
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
