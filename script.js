let questions = [['q1', ['ans11', 'ans12', 'ans13', 'ans14'], 1],
                 ['q2', ['ans21', 'ans22', 'ans23', 'ans24'], 2],
                 ['q3', ['ans31', 'ans32', 'ans33', 'ans34'], 3]];
let status = [false, false, false, false]
let rightAnswer = 0;
let questionIndex = 0;
let answerIndex = 0;
let gameScore = 0;
let error = false;


function startGame() {
    let startButton = document.getElementById('start');
    let score = document.getElementById('sc');
    let gameStatus = document.getElementById('st');
    startButton.hidden = true;
    score.hidden = true;
    gameStatus.hidden = true;
    status = [false, false, false, false];
    rightAnswer = 0;
    gameScore = 0;
    error = false;
}

function finishGame() {
    if (!error)
        gameScore += 10;
    status[questionIndex] = true;
    let startButton = document.getElementById('start');
    let gameStatus = document.getElementById('st');
    startButton.hidden = false;
    startButton.innerHTML = 'Начать игру';
    gameStatus.hidden = false;
    questionIndex = 0;
}

function loadQuestion(btnIndex) {
    if (btnIndex !== 0)
        gameScore += 10;
    startTimer(questionIndex);
    status[questionIndex] = true;
    let question = document.getElementById('q');
    let buttons = document.querySelectorAll('button');
    question.innerHTML = questions[questionIndex][0];
    for (let btn of buttons) {
        btn.innerHTML = questions[questionIndex][1][answerIndex];
        answerIndex += 1;
    }
    rightAnswer = questions[questionIndex][2];
    questionIndex += 1;
    answerIndex = 0;
}

function eventHandler(btnIndex) {
    if (questionIndex === questions.length && btnIndex === rightAnswer)
        finishGame();
    else {
        if (btnIndex === 0)
            startGame();
        if (btnIndex === rightAnswer || btnIndex === 0)
            loadQuestion(btnIndex);
        else {
            error = true;
            finishGame();
        }
    }
}

function changeScore(width, index) {
    let score = document.getElementById('sc');
    if (error) {
        score.innerHTML = gameScore;
        score.hidden = false;
    }
    else {
        gameScore += 30 - parseInt(width / 2);
        score.innerHTML = gameScore;
        if (index + 1 === questions.length)
            score.hidden = false;
    }
}

function startTimer(index) {
    let progress = document.getElementById("progress");
    let width = 0;
    let id = setInterval(frame, 500);
    function frame() {
        if (width >= 60 || status[index + 1] === true) {
            clearInterval(id);
            changeScore(width, index);
        }
        else {
            width++;
            progress.style.width = width + '%';
            progress.innerHTML = 30 - parseInt(width / 2);
        }
    }
}