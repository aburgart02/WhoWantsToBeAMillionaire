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
        disable_buttons();
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
    startButton.hidden = true;
    score.hidden = true;
    gameStatus.hidden = true;
    status = [];
    rightAnswer = 0;
    gameScore = 0;
}

function finishGame(isCorrect) {
    let startButton = document.getElementById('start');
    let gameStatus = document.getElementById('st');
    let score = document.getElementById('sc');
    let progress = document.getElementById("progress");
    disable_buttons();
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

function disable_buttons() {
    let buttons = document.querySelectorAll('button');
    for (let btn of buttons) {
        btn.disabled = true;
    }
}