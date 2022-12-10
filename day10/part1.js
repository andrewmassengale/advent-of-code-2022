const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\n');

const keyCycles = [ 20, 60, 100, 140, 180, 220 ];
let x = 1;
let signalStrength = 0;
let cycleNum = 0;

const addCycleNum = () => {
	cycleNum += 1;
	if (keyCycles.indexOf(cycleNum) !== -1) {
		signalStrength += cycleNum * x;
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

console.log(signalStrength);