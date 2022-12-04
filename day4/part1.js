const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n');

const isFullyEncapsulated = ([ start1, end1 ], [ start2, end2 ]) => {
	return (start1 <= start2 && end1 >= end2) ||
		(start2 <= start1 && end2 >= end1);
};

let numFullyEncapsulated = 0;

const pairs = data.map((line) => {
	const [ assign1, assign2 ] = line.split(',');
	const [ assign1Start, assign1End ] = assign1.split('-').map((num) => parseInt(num));
	const [ assign2Start, assign2End ] = assign2.split('-').map((num) => parseInt(num));

	if (isFullyEncapsulated([ assign1Start, assign1End ], [ assign2Start, assign2End ])) {
		numFullyEncapsulated = ++numFullyEncapsulated;
	}

	return [ [ assign1Start, assign1End ], [ assign2Start, assign2End ] ];
});

console.log(numFullyEncapsulated);