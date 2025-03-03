//your JS code here.
document.addEventListener("DOMContentLoaded",function(){
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

// Display the quiz questions and choices
const quizContainer = document.getElementById("question");
const submitBuuton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

	const savedProgress = JOSN.parse(sessionStorage.getItem("progress")) || {};
	function renderQuiz(){
		quizContainer.innerHTML ="";
		questions.forEach((q,index)=>{
			const questionDiv = document.createElement("div");
			questionDiv.innerHTML  = `<p>${index+1}.${q.question}</p>`;

			q.option.forEach(option=>{
				const label = document.createElement("label");
				label.innerHTML = `<input type="radio" name="q${index}" value="${option}" ${savedProgress[`q${index}`] === option ? "checked" : ""}>
                    ${option}
                `;
				questionDiv.appendChild(label);
			});
			quizContainer.appendChild(questionDiv);
		});
	}
	renderQuiz();

	quizContainer.addEventListener("change",function(event){
		if(event.target.type === "radio"){
			savedProgress[event.target.name] = event.target.value;
			sessionStorage.setItem("progress",JSON.stringify(savedProgress));
		}
	});
	submitBuuton.addEventListener("click",function(){
		let score = 0;

		questions.forEach((q.index)=>{
			if(savedProgress[`q${index}`]===q.answer){
				score++;
			}
		});
	localStorage.setItem("score",score);
	scoreDisplay.textContent = `Your score is ${score} out of 5.`;
	});
const lastScore = localStorage.getItem("score");
    if (lastScore !== null) {
        scoreDisplay.textContent = `Your last score was ${lastScore} out of 5.`;
    }
});
