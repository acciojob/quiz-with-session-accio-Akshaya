//your JS code here.

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

function saveProgress(questionIndex,selectedValue){
	let progress=JSON.parse(sessionStorage.getItem("progress")) || {};
	progress[questionIndex]=selectedValue;
	sessionStorage.setItem("progress",JSON.stringify(progress));
}

// Display the quiz questions and choices
function renderQuestions() {
    const questionDiv = document.querySelector("#questions");
    questionDiv.innerHTML = ""; // Clear previous content

	let progress = JSON.parse(sessionStorage.getItem("progress"))|| {};
	
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        questionElement.innerHTML = <p>${question.question}</p>;

        for (let j = 0; j < question.choices.length; j++) {
            const choice = questions[i].choices[j];

            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", question-${i});
            choiceElement.setAttribute("value", choice);

			
			if (progress[i] === choice) {
			    choiceElement.setAttribute("checked", "true");
			}
			
			choiceElement.addEventListener("change",()=>{
				saveProgress(i,choice);
			})
			
            const choiceLabel = document.createElement("label");
            choiceLabel.appendChild(choiceElement);
            choiceLabel.appendChild(document.createTextNode(choice));

            questionElement.appendChild(choiceLabel);
            questionElement.appendChild(document.createElement("br"));
        }

        questionDiv.appendChild(questionElement);
    }
}

function calculateScore(){
	let score=0;
	let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

	questions.forEach((question, i) => {
    if (progress[i] === question.answer) {
      score++;
    }
  });
	localStorage.setItem("score",score);
	document.getElementById("score").innerHTML=<span>Your score is ${score} out of 5.</span>;
	sessionStorage.removeItem("progress");
}

let btn=document.getElementById("submit");
btn.addEventListener("click",calculateScore);
renderQuestions();