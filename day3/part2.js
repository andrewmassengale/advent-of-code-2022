const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n');

const getCharScore = (char) => {
	if (char === char.toLowerCase()) {
		return char.charCodeAt(0) - 96;
	}
	return char.charCodeAt(0) - 38;
}

const commonCharacters = (string1, string2) => {
	let duplicateCharacter = '';
	for (let i = 0; i < string1.length; i += 1) {
		if (duplicateCharacter.indexOf(string1[i]) === -1) {
			if (string2.indexOf(string1[i]) !== -1) {
				duplicateCharacter += string1[i];
			}
		}
	}
	return duplicateCharacter;
};

const sacks = data.reduce((curSacks, line, i) => {
	if (i % 3 === 0) {
		curSacks.push([ ]);
	}
	curSacks[curSacks.length - 1].push(line);

	return curSacks;
}, [ ]);

let sum = 0;

sacks.map(([ sack1, sack2, sack3 ]) => {
	const dupeChar1 = commonCharacters(sack1, sack2);
	const dupeChar = commonCharacters(dupeChar1, sack3);
	sum += getCharScore(dupeChar);
});

console.log(sum);