import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';
import api from './services/api';

function App() {
	const [questions, setQuestions] = useState([{correct_answer: "loading", incorrect_answers: ["loading", "loading", "loading"], question: "Loading..."}]);
	const [gameOn, setGameOn] = useState(false);
	const [thisQuestion, setThisQuestion] = useState();
	const [correctAnswer, setCorrectAnswer] = useState();
	const [points, setPoints] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [gameOver, setGameOver] = useState(false);

	const checkAnswer = (choice) => {
		if (choice === correctAnswer) {
			setPoints(points + 1);
			console.log('correct!');
		} else console.log("uh oh, that's incorrect!");
		setQuestionNum(questionNum+1);
	};

	const resolveAscii = (text) => {
		while (text.includes('&')) {
			text = text.replace('&#039;', "'");
			text = text.replace('&ldquo;', '"');
			text = text.replace('&rdquo;', '"');
			text = text.replace('&oacute;', 'o');
			text = text.replace('&quot;', '"');
		}
		return text;
	};

	const startGame = () => {
		api.get().then((response) => {
			setQuestions(response.data.results);
			console.log(response.data.results);
			setQuestionNum(0);
      setPoints(0);
      setGameOver(false);
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

	useEffect(() => {
    if ( 24 > questionNum && questionNum >= 0) {
      let newQuestion = questions[questionNum];
      setCorrectAnswer(newQuestion.correct_answer);
      let allChoices = newQuestion.incorrect_answers;
      allChoices = shuffle([...allChoices, newQuestion.correct_answer]);
      setThisQuestion([...allChoices, newQuestion.question].map(resolveAscii));
    }
    else {
      setGameOn(false);
      setGameOver(true);
    }
	}, [questionNum, questions]);

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
      { gameOver && (
        <div className="main">
          <h2>Your Score:</h2>
          <h2>{points}</h2>
          <button className="startButton" onClick={startGame}>Play Again</button>
        </div>
      ) }
		</div>
	);
}

export default App;
