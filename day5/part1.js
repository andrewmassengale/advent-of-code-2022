const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n');

let cargo = [ ];

const move = (num, from, to) => {
	for (let i = 0; i < num; ++i) {
		const item = cargo[from].shift();
		cargo[to].unshift(item);
	}
};

const addToCargo = (i, item) => {
	if (!Array.isArray(cargo[i])) {
		cargo.push([]);
	}
	cargo[i].push(item);
}

const buildLine = (line) => {
	let numPrevSpaces = 0;
	let i = 0;
	line.forEach((part) => {
		if (part === ' ') {
			numPrevSpaces = ++numPrevSpaces;
			if (numPrevSpaces === 4) {
				addToCargo(i, '');
				++i;
				numPrevSpaces = 0;
			}
			return;
		}
		if (part.match(/[A-Z]/)) {
			addToCargo(i, part);
			++i;
			numPrevSpaces = 0;
		}
	});
};

data.forEach((line) => {
	const parts = line.split('');

	if (parts.length === 0) {
		cargo = cargo.map((stack) => stack.filter((item) => item !== ''));
	} if (parts[0] === 'm') {
		const command = line.split(' ');
		move(parseInt(command[1]), parseInt(command[3]) - 1, parseInt(command[5]) - 1);
	} else if (parts[1] !== '1') {
		buildLine(parts);
	}
});

console.log('cargo', cargo);