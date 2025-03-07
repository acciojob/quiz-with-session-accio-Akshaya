//your JS code here.
document.addEventListener("DOMContentLoaded",()=>{
// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

	if (!Array.isArray(questions) || questions.length === 0) {
        console.error("Questions array is not loaded correctly.");
        return;
    }

    const questionsContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    // Load stored progress
    let storedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.choices.forEach(option => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question${index}`;
            radio.value = option;
            
            // Restore saved answer
            if (storedProgress[index] === option) {
                radio.checked = true; 
                console.log(`Restored selection for question ${index}: ${option} (${radio.checked})`);
            }

            radio.addEventListener("change", () => {
                storedProgress[index] = option;
                sessionStorage.setItem("progress", JSON.stringify(storedProgress));
                console.log("Updated Session Storage:", sessionStorage.getItem("progress"));
            });

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        questionsContainer.appendChild(questionDiv);
    });

    // Load stored score
    if (localStorage.getItem("score")) {
        scoreDisplay.textContent = `Your last score was: ${localStorage.getItem("score")}/5`;
    }

    submitButton.addEventListener("click", () => {
    // Update storedProgress with the currently selected options
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            storedProgress[index] = selectedOption.value;
        }
    });
    sessionStorage.setItem("progress", JSON.stringify(storedProgress));

    // Now calculate the score
    let score = 0;
    questions.forEach((q, index) => {
        if (storedProgress[index] === q.answer) {
            score++;
        }
    });

    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
    console.log("Score Saved to Local Storage:", localStorage.getItem("score"));
});

    // Debugging: Show session storage on page load
    console.log("Session Storage on Load:", sessionStorage.getItem("progress"));
});




	