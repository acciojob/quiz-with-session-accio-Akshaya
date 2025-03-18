const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: "100°C"
    }
];

const questionContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load progress from sessionStorage
function loadProgress() {
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach((option) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;
            if (savedProgress[index] === option) input.checked = true;

            input.addEventListener("change", () => {
                savedProgress[index] = input.value;
                sessionStorage.setItem("progress", JSON.stringify(savedProgress));
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            div.appendChild(label);
            div.appendChild(document.createElement("br"));
        });

        questionContainer.appendChild(div);
    });
}

// Submit quiz and calculate score
submitButton.addEventListener("click", () => {
    let score = 0;
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    questions.forEach((q, index) => {
        if (savedProgress[index] === q.answer) {
            score++;
        }
    });

    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});

// Load score from localStorage if quiz was submitted
window.addEventListener("load", () => {
    loadProgress();
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
    }
});
