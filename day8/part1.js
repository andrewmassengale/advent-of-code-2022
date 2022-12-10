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

const isVisible = ([ x, y ]) => {
	if (x === 0 || y === 0 || x === numCols - 1 || y === numRows - 1) {
		return true;
	}

	const val = trees[y][x];
	let validDirs = [ true, true, true, true ];
	for (let i = 1; i < numRows; ++i) {
		const up = y - i >= 0 ? [ x, y - i ] : true;
		const right = x + i < numCols ? [ x + i, y ] : true;
		const down = y + i < numRows ? [ x, y + i ] : true;
		const left = x - i >= 0 ? [ x - i, y ] : true;

		if (up !== true && trees[up[1]][up[0]] >= val) {
			validDirs[0] = false;
		}
		if (right !== true && trees[right[1]][right[0]] >= val) {
			validDirs[1] = false;
		}
		if (down !== true && trees[down[1]][down[0]] >= val) {
			validDirs[2] = false;
		}
		if (left !== true && trees[left[1]][left[0]] >= val) {
			validDirs[3] = false;
		}
	}

	return (validDirs.filter(Boolean).length > 0);
}

const visibleCoords = [ ];
trees.forEach((row, y) => {
	row.forEach((_, x) => {
		if (isVisible([ x, y ])) {
			visibleCoords.push([ x, y ]);
		}
	});
});

console.log(visibleCoords.length);
