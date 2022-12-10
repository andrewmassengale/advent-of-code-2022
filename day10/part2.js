const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\n');

const keyCycles = [ 40, 80, 120, 160, 200, 240, 280 ];
let x = 1;
let signal = [ '' ];
let cycleNum = 0;

const addCycleNum = () => {
	cycleNum += 1;
	const curCrtIdx = signal.length - 1;
	const curCrtPos = signal[curCrtIdx].length + 1;
	if ([ x, x + 1, x + 2 ].indexOf(curCrtPos) !== -1) {
		signal[curCrtIdx] += '#';
	} else {
		signal[curCrtIdx] += '.';
	}
	if (keyCycles.indexOf(cycleNum) !== -1) {
		signal.push('');
	}
};

data.forEach((cycle) => {
	if (cycle !== 'noop') {
		const num = parseInt(cycle.split(' ')[1]);
		addCycleNum();
		addCycleNum();
		x += num;
	} else {
		addCycleNum();
	}
});

console.log(signal.join('\n'));