let status = []
let rightAnswer = 0;
let questionIndex = 0;
let answerIndex = 0;
let gameScore = 0;
let callFriendIsUsed = false;
let removedButtons = [];
let questions = []
const requestURL = 'materials/questions.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    let jsonObjects = request.response;
    for (let questionNumber in jsonObjects){
        questions.push(jsonObjects[questionNumber]);
    }

}


function eventHandler(buttonIndex) {
    status[questionIndex] = true;
    if (questionIndex === questions.length && buttonIndex === rightAnswer) {
        gameScore += 10;
        highlightAnswer(buttonIndex, false, true, false);
    }
    else {
        if (buttonIndex === 0) {
            startGame();
            updateField();
        }
        else if (buttonIndex === rightAnswer) {
            gameScore += 10;
            highlightAnswer(buttonIndex, true, true, false);
        }
        else
            highlightAnswer(buttonIndex, false, false, false);
    }
}

function highlightAnswer(buttonIndex, hasNext, isCorrect, timeIsOver) {
    let picture = document.getElementById('pct');
    if (timeIsOver) {
        picture.src = `materials/${questions[status.length - 1][2]}_${questions[status.length - 1][2]}.png`;
        finishGame(isCorrect);
    }
    else {
        picture.src = `materials/${buttonIndex}.png`;
        disableButtons();
        setTimeout(showAnswer, 2000);
        function showAnswer() {
            picture.src = `materials/${buttonIndex}_${questions[status.length - 2][2]}.png`;
            setTimeout(() => {
                if (hasNext)
                    updateField();
                else
                    finishGame(isCorrect);
            }, 1000);
        }
    }
}

function startGame() {
    let startButton = document.getElementById('start');
    let score = document.getElementById('sc');
    let gameStatus = document.getElementById('st');
    let fiftyFiftyHint = document.getElementById('50-50');
    let callFriend = document.getElementById('call');
    startButton.hidden = true;
    score.hidden = true;
    gameStatus.hidden = true;
    fiftyFiftyHint.hidden = false;
    callFriend.innerHTML = '<img src="materials/call_friend.png" width="150" height="150">';
    callFriend.hidden = false;
    status = [];
    rightAnswer = 0;
    gameScore = 0;
    callFriendIsUsed = false;
}

function finishGame(isCorrect) {
    let startButton = document.getElementById('start');
    let gameStatus = document.getElementById('st');
    let score = document.getElementById('sc');
    let progress = document.getElementById("progress");
    disableButtons();
    startButton.disabled = false;
    startButton.innerHTML = 'Начать игру';
    startButton.hidden = false;
    gameStatus.hidden = false;
    if (isCorrect)
        score.innerHTML = gameScore;
    else
        score.innerHTML = gameScore - parseInt(parseInt(progress.style.width) / 2);
    score.hidden = false;
    questionIndex = 0;
    rightAnswer = 0;
}

function updateField() {
    startTimer(questionIndex);
    status[questionIndex] = true;
    removedButtons = [];
    let question = document.getElementById('q');
    let buttons = document.querySelectorAll('button');
    question.innerHTML = questions[questionIndex][0];
    while (answerIndex < 5) {
        buttons[answerIndex].disabled = false;
        buttons[answerIndex].innerHTML = questions[questionIndex][1][answerIndex];
        answerIndex += 1;
    }
    buttons[5].disabled = false;
    buttons[6].disabled = false;
    if (callFriendIsUsed)
        buttons[6].hidden = true;
    rightAnswer = questions[questionIndex][2];
    questionIndex += 1;
    answerIndex = 0;
    let picture = document.getElementById('pct');
    picture.src = 'materials/question_field.png';
}

function startTimer(buttonIndex) {
    let progress = document.getElementById("progress");
    let width = 60;
    let id = setInterval(frame, 500);
    function frame() {
        if (width <= 0) {
            clearInterval(id);
            highlightAnswer(buttonIndex, false, false, true);
        }
        if (status[buttonIndex + 1] === true) {
            clearInterval(id);
            gameScore += parseInt(width / 2);
        }
        else {
            width--;
            progress.style.width = width + '%';
            progress.innerHTML = parseInt(width / 2);
        }
    }
}

function disableButtons() {
    let buttons = document.querySelectorAll('button');
    for (let btn of buttons) {
        btn.disabled = true;
    }
}

function fiftyFifty() {
    let first = rightAnswer;
    let second = rightAnswer;
    let buttons = document.querySelectorAll('button');
    while (first === rightAnswer)
        first = Math.floor(Math.random() * 4) + 1;
    while (second === rightAnswer || second === first)
        second = Math.floor(Math.random() * 4) + 1;
    buttons[first - 1].disabled = true;
    buttons[first - 1].innerHTML = '';
    buttons[second - 1].disabled = true;
    buttons[second - 1].innerHTML = '';
    buttons[5].hidden = true;
    removedButtons = [first, second];
}

function callFriend() {
    let buttons = document.querySelectorAll('button');
    let rand = Math.round(Math.random() * 100);
    let friendAnswer = rightAnswer;
    if (rand >= 60) {
        if (removedButtons.length === 0) {
            while (friendAnswer === rightAnswer)
                friendAnswer = Math.floor(Math.random() * 4) + 1;
        }
        else {
            while (friendAnswer === rightAnswer || friendAnswer === removedButtons[0] || friendAnswer === removedButtons[1])
                friendAnswer = Math.floor(Math.random() * 4) + 1;
        }
    }
    buttons[6].innerHTML = friendAnswer;
    buttons[6].disabled = true;
    callFriendIsUsed = true;
}