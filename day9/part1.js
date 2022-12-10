const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\n');

let curH = [ 50, 50 ];
let curT = [ 50, 50 ];
const tVisits = [ '50_50' ];

const calculateT = () => {
	const xDiff = curH[0] - curT[0];
	const yDiff = curH[1] - curT[1];
	if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) {
		return;
	}

	if (xDiff >= 1) {
		curT[0] = curT[0] + 1;
	} else if (xDiff <= -1) {
		curT[0] = curT[0] - 1;
	}
	if (yDiff >= 1) {
		curT[1] = curT[1] + 1;
	} else if (yDiff <= -1) {
		curT[1] = curT[1] - 1;
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

		calculateT();

		tVisits.push(`${curT[0]}_${curT[1]}`);
	}
});

const uniqueT_visits = [ ...new Set(tVisits) ];

console.log(uniqueT_visits.length);