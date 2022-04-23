let questions = [['q1', ['ans11', 'ans12', 'ans13', 'ans14'], 1],
                 ['q2', ['ans21', 'ans22', 'ans23', 'ans24'], 2],
                 ['q3', ['ans31', 'ans32', 'ans33', 'ans34'], 3]];
let status = [false, false, false]
let rightAnswer = 0;
let questionIndex = 0;
let answerIndex = 0;


function checkAnswer(btnIndex, btn) {
    if (btnIndex === 0)
        btn.hidden = true;
    if (btnIndex === rightAnswer || btnIndex === 0) {
        startTimer(questionIndex);
        status[questionIndex] = true;
        let buttons = document.querySelectorAll('button');
        let question = document.getElementById('q');
        let score = document.getElementById('s');
        question.innerHTML = questions[questionIndex][0];
        for (let btn of buttons) {
            btn.innerHTML = questions[questionIndex][1][answerIndex];
            answerIndex += 1;
        }
        rightAnswer = questions[questionIndex][2];
        questionIndex += 1;
        answerIndex = 0;
    }
}

function startTimer(index) {
    let progress = document.getElementById("progress");
    let width = 0;
    let id = setInterval(frame, 500);
    function frame() {
        if (width >= 60 || status[index + 1] === true) {
            clearInterval(id);
        }
        else {
            width++;
            progress.style.width = width + '%';
            progress.innerHTML = 30 - parseInt(width / 2);
        }
    }
}