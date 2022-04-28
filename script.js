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

function startGame() {
    let startButton = document.getElementById('start');
    let score = document.getElementById('sc');
    let gameStatus = document.getElementById('st');
    startButton.hidden = true;
    score.hidden = true;
    gameStatus.hidden = true;
    status = [];
    rightAnswer = 0;
    gameScore = 0;
}

function disable_buttons() {
    let buttons = document.querySelectorAll('button');
    for (let btn of buttons) {
        btn.disabled = true;
    }
}

function finishGame(index, correct) {
    highlightAnswer(index, false);
    let startButton = document.getElementById('start');
    let gameStatus = document.getElementById('st');
    let score = document.getElementById('sc');
    let progress = document.getElementById("progress");
    disable_buttons();
    startButton.disabled = false;
    startButton.innerHTML = 'Начать игру';
    startButton.hidden = false;
    gameStatus.hidden = false;
    if (correct)
        score.innerHTML = gameScore + 10 + parseInt(parseInt(progress.style.width) / 2);
    else
        score.innerHTML = gameScore
    score.hidden = false;
    questionIndex = 0;
    rightAnswer = 0;
}

function updateField() {
    startTimer(questionIndex);
    status[questionIndex] = true;
    let question = document.getElementById('q');
    let buttons = document.querySelectorAll('button');
    question.innerHTML = questions[questionIndex][0];
    for (let btn of buttons) {
        btn.disabled = false;
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
    disable_buttons();
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
    status[questionIndex] = true;
    if (questionIndex === questions.length && btnIndex === rightAnswer)
        finishGame(btnIndex, true);
    else {
        if (btnIndex === 0) {
            startGame();
            loadQuestion(btnIndex);
        }
        else if (btnIndex === rightAnswer)
            loadQuestion(btnIndex);
        else
            finishGame(btnIndex, false);
    }
}

function startTimer(index) {
    let progress = document.getElementById("progress");
    let width = 60;
    let id = setInterval(frame, 500);
    function frame() {
        if (width <= 0) {
            clearInterval(id);
            finishGame(index, false);
        }
        if (status[index + 1] === true) {
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