const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n');

const elves = [ [ ] ];

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

data.map((line) => {
	if (line !== '') {
		elves[elves.length - 1].push(parseInt(line));
	} else {
		elves.push([ ]);
	}
});

const elfSums = elves.map((elf) => sum(elf));
const topThreeSums = elfSums.sort((a, b) => a - b).reverse().slice(0, 3);
const sumOfTopThree = sum(topThreeSums);

console.log(sumOfTopThree);