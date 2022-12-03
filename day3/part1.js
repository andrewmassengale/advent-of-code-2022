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

const sacks = data.map((line) => {
	const lineLen = line.length;

	return [ line.substring(0, lineLen/2), line.substring(lineLen/2, lineLen) ];
});

let sum = 0;

sacks.map(([ sack1, sack2 ]) => {
	const dupeChar = commonCharacters(sack1, sack2);
	sum += getCharScore(dupeChar);
});

console.log(sum);