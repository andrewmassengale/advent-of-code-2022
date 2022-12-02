const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n');

const oponnentMap = {
	A: 'rock',
	B: 'paper',
	C: 'scissors'
};
const myMap = {
	X: 'rock',
	Y: 'paper',
	Z: 'scissors'
};

const determineMe = (input, outcome) => {
	switch (input) {
		case 'rock':
			if (outcome === 'X') return 'Z';
			else if (outcome === 'Y') return 'X';
			else return 'Y';
		case 'paper':
			if (outcome === 'X') return 'X';
			else if (outcome === 'Y') return 'Y';
			else return 'Z';
		case 'scissors':
			if (outcome === 'X') return 'Y';
			else if (outcome === 'Y') return 'Z';
			else return 'X';
	}
}

const winner = (player1, player2) => {
	if (player1 === player2) {
		return -1;
	}
	if ((player1 === 'rock' && player2 === 'scissors') ||
		(player1 === 'scissors' && player2 === 'paper') ||
		(player1 === 'paper' && player2 === 'rock')) {
		return 1;
	}
	return 2;
}

const score = (you, outcome) => {
	const me = determineMe(oponnentMap[you], outcome);
	const theWinner = winner(oponnentMap[you], myMap[me]);

	let mySelectionScore = 0;
	if (me === 'X') mySelectionScore = 1;
	else if (me === 'Y') mySelectionScore = 2;
	else mySelectionScore = 3;

	let winnerScore = 0;
	if (theWinner === -1) winnerScore = 3;
	else if (theWinner === 2) winnerScore = 6;

	return mySelectionScore + winnerScore;
}

const rounds = data.map((line) => line.split(' '));
const totalScore = rounds.reduce((currentScore, round) => currentScore + score(round[0], round[1]), 0);

console.log(totalScore);