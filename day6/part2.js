const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('');

let count = 0;
let str = '';
let startOfPacket = -1;

data.forEach((char) => {
	count = ++count;
	if (str.length !== 14) {
		return str += char;
	}
	str = str.substring(1) + char;
	const uniqChars = new Set(str).size;
	if (uniqChars === 14 && startOfPacket === -1) {
		startOfPacket = count;
	}
});

console.log(startOfPacket);