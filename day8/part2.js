const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\n');

const numRows = data.length;
const numCols = data[0].split('').length;
const trees = new Array(numRows).fill([ ]);

data.forEach((line, idx) => {
	trees[idx] = line.split('').map((num) => parseInt(num));
});

const getScore = ([ x, y ]) => {
	if (x === 0 || y === 0 || x === numCols - 1 || y === numRows - 1) {
		return 0;
	}

	const val = trees[y][x];
	let stopDirs = [ false, false, false, false ];
	let dirs = [ 0, 0, 0, 0 ];
	for (let i = 1; i < numRows; ++i) {
		const up = y - i >= 0 ? [ x, y - i ] : true;
		const right = x + i < numCols ? [ x + i, y ] : true;
		const down = y + i < numRows ? [ x, y + i ] : true;
		const left = x - i >= 0 ? [ x - i, y ] : true;

		if (up === true) {
			stopDirs[0] = true;
		}
		if (right === true) {
			stopDirs[1] = true;
		}
		if (down === true) {
			stopDirs[2] = true;
		}
		if (left === true) {
			stopDirs[3] = true;
		}

		if (!stopDirs[0]) {
			dirs[0] = i;
		}
		if (!stopDirs[1]) {
			dirs[1] = i;
		}
		if (!stopDirs[2]) {
			dirs[2] = i;
		}
		if (!stopDirs[3]) {
			dirs[3] = i;
		}

		if (up !== true && trees[up[1]][up[0]] >= val) {
			stopDirs[0] = true;
		}
		if (right !== true && trees[right[1]][right[0]] >= val) {
			stopDirs[1] = true;
		}
		if (down !== true && trees[down[1]][down[0]] >= val) {
			stopDirs[2] = true;
		}
		if (left !== true && trees[left[1]][left[0]] >= val) {
			stopDirs[3] = true;
		}
	}

	return dirs[0] * dirs[1] * dirs[2] * dirs[3];
}

let highestScore = 0;
trees.forEach((row, y) => {
	row.forEach((_, x) => {
		const score = getScore([ x, y ]);
		if (score > highestScore) {
			highestScore = score;
		}
	});
});

console.log(highestScore);
