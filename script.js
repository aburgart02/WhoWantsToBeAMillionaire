let questions = [['В каком году произошла Куликовская битва?', ['1380', '1340', '1223', '1136'], 1],
                 ['Столица Эквадора', ['Лима', 'Асунсьон', 'Кито', 'Каракас'], 3],
                 ['В каком году были проведены первые современные Олимпийские игры?', ['1900', '1892', '1902', '1896'], 4],
                 ['Сколько наград "Оскар" получил фильм "Побег из Шоушенка?"', ['3', '0', '5', '1'], 2],
                 ['В какой из этих стран один из официальных языков - французский?', ['Республика Гаити', 'Кения', 'Венесуэла', 'Боливия'], 1]];
let status = []
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

function finishGame(index) {
    if (!error) {
        gameScore += 10;
        highlightAnswer(index, false);
    }
    status[questionIndex] = true;
    let startButton = document.getElementById('start');
    let gameStatus = document.getElementById('st');
    startButton.hidden = false;
    startButton.innerHTML = 'Начать игру';
    gameStatus.hidden = false;
    questionIndex = 0;
}

function updateField() {
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
    let picture = document.getElementById('pct');
    picture.src = 'materials/question_field.png';
}

function highlightAnswer(btnIndex, next) {
    let picture = document.getElementById('pct');
    picture.src = `materials/${btnIndex}.png`;
    if (next) {
        let timeout = setTimeout('updateField()', 2000);
    }
}

function loadQuestion(btnIndex) {
    if (btnIndex !== 0) {
        gameScore += 10;
        highlightAnswer(btnIndex, true);
    }
    else
        updateField();
}

function eventHandler(btnIndex) {
    if (questionIndex === questions.length && btnIndex === rightAnswer)
        finishGame(btnIndex);
    else {
        if (btnIndex === 0)
            startGame();
        if (btnIndex === rightAnswer || btnIndex === 0)
            loadQuestion(btnIndex);
        else {
            error = true;
            finishGame(btnIndex);
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