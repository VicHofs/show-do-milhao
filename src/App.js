import React, { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';
import api from './services/api';

function App() {
	const [gameOn, setGameOn] = useState(false);
	const [thisQuestion, setThisQuestion] = useState();
	const [correctAnswer, setCorrectAnswer] = useState();
	let questions = {};
	const [points, setPoints] = useState(0);
	let questionNum = 0;

	const checkAnswer = (choice) => {
    if (choice === correctAnswer) setPoints(points + 1);
    nextQuestion();
	};

	const resolveAscii = (text) => {
		for (const char of text) {
			if (char === '&') {
				text = text.replace('&#039;', "'");
				text = text.replace('&ldquo;', '"');
				text = text.replace('&rdquo;', '"');
				text = text.replace('&oacute;', 'o');
				text = text.replace('&quot;', '"');
				break;
			}
		}
		return text;
	};

	const startGame = () => {
		api.get().then((response) => {
			setPoints(0);
			questionNum = 0;
			questions = response.data.results;
			console.log(questions);
			nextQuestion();
			setGameOn(true);
		});
	};

	const shuffle = (a) => {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	};

	const nextQuestion = () => {
		let newQuestion = questions[questionNum];
		setCorrectAnswer(newQuestion.correct_answer);
		let allChoices = newQuestion.incorrect_answers;
		allChoices = shuffle([...allChoices, newQuestion.correct_answer]);
		setThisQuestion(
			[...allChoices, newQuestion.question].map(resolveAscii)
		);
		questionNum++;
	};

	return (
		<div className="main">
			<img alt="" src={logo} />
			{!gameOn && (
				<button onClick={startGame} className="startButton">
					<span>Start Game</span>
				</button>
			)}
			{gameOn && <p>{thisQuestion[4]}</p>}
			{gameOn && (
				<ul className="questions">
					<button
						value={thisQuestion[0]}
						id="0"
						onClick={(e) => checkAnswer(e.target.value)}
					>
						{thisQuestion[0]}
					</button>
					<button
						value={thisQuestion[1]}
						id="0"
						onClick={(e) => checkAnswer(e.target.value)}
					>
						{thisQuestion[1]}
					</button>
					<button
						value={thisQuestion[2]}
						id="0"
						onClick={(e) => checkAnswer(e.target.value)}
					>
						{thisQuestion[2]}
					</button>
					<button
						value={thisQuestion[3]}
						id="0"
						onClick={(e) => checkAnswer(e.target.value)}
					>
						{thisQuestion[3]}
					</button>
				</ul>
			)}
		</div>
	);
}

export default App;
