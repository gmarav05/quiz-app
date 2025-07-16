const apiKey = "khiabWLsM7Q7aySHcjA6I0h4ZK9QUba7uTYJKHzt";
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

let questions = [];
let currentQuestionIndex = 0;

async function fetchQuestions() {
    const res = await fetch('https://quizapi.io/api/v1/questions?limit=5&category=code', {
        headers : {'X-Api-Key': apiKey }
    });

    const data = await res.json();
    questions = data;

    showQuestion();    
}

function showQuestion() {

    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';

    for (let key in q.answers) {

        if (q.answers[key]) {
            const li = document.createElement('li');
            li.textContent = q.answers[key];
            li.onclick = () => checkAnswer(key, q.correct_answers);
            answersEl.appendChild(li);
        }
    }
}


function checkAnswer(selected, correct_answers) {

    const isCorrect = correct_answers[selected + '_correct'] === 'true';
    alert(isCorrect ? "Correct" : "Wrong!");
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionEl.textContent = "Completed";
        answersEl.innerHTML = '';
        nextBtn.style.display = "none";
    }

};

fetchQuestions();