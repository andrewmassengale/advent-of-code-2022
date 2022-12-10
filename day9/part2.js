const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\n');

let curH = [ 500, 500 ];
let curTs = new Array(9).fill(null).map(() => [ 500, 500 ]);
const tVisits = [ '500_500' ];

const calculateTs = () => {
	for (let i = 0; i < 9; ++i) {
		const curX = (i === 0) ? curH[0] : curTs[i - 1][0];
		const curY = (i === 0) ? curH[1] : curTs[i - 1][1];
		const xDiff = curX - curTs[i][0];
		const yDiff = curY - curTs[i][1];
		if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) {
			continue;
		}

		if (xDiff >= 1) {
			curTs[i][0] = curTs[i][0] + 1;
		} else if (xDiff <= -1) {
			curTs[i][0] = curTs[i][0] - 1;
		}
		if (yDiff >= 1) {
			curTs[i][1] = curTs[i][1] + 1;
		} else if (yDiff <= -1) {
			curTs[i][1] = curTs[i][1] - 1;
		}
	}
}

data.forEach((cmd) => {
	const [ dir, num ] = cmd.split(' ');

	for (let i = 0; i < num; ++i) {
		if (dir === 'U') {
			curH = [ curH[0], curH[1] - 1 ];
		} else if (dir === 'R') {
			curH = [ curH[0] + 1, curH[1] ];
		} else if (dir === 'D') {
			curH = [ curH[0], curH[1] + 1 ];
		} else {
			curH = [ curH[0] - 1, curH[1] ];
		}

		calculateTs();

		tVisits.push(`${curTs[8][0]}_${curTs[8][1]}`);
	}
});

const uniqueT_visits = [ ...new Set(tVisits) ];

console.log(uniqueT_visits.length);