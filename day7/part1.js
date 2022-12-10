const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'test.txt'));
const data = fileData.toString().split('\n');

const dirs = { '/0': { subdirs: [ ], fileSize: 0, totalSize: 0 } };
const dirCount = { '/': 0 };
let curDir = '/';
let processingDir = false;
let largestNumSubdirs = 0;

const processName = (name, increment = false) => {
	if (increment) {
		if (!(name in dirCount)) {
			dirCount[name] = 0;
		} else {
			dirCount[name] = ++dirCount[name];
		}
	}
	return `${name}${dirCount[name]}`;
}

data.forEach((cmd) => {
	if (processingDir) {
		if (cmd.indexOf('$ ') !== -1) {
			processingDir = false;
		} else {
			const cmdSplit = cmd.split(' ');
			if (cmdSplit[0] === 'dir') {
				const newDirName = processName(cmdSplit[1], true);
				dirs[curDir].subdirs.push(newDirName);
				if (dirs[curDir].subdirs.length > largestNumSubdirs) {
					largestNumSubdirs = dirs[curDir].subdirs.length;
				}
			} else {
				dirs[curDir].fileSize += parseInt(cmdSplit[0]);
			}
		}
	}
	if (cmd.indexOf('$ cd ') !== -1 && cmd.indexOf('$ cd ..') === -1) {
		curDir = processName(cmd.split(' ')[2]);
		if (!dirs[curDir]) {
			dirs[curDir] = { subdirs: [ ], fileSize: 0, totalSize: 0 };
		}
	} else if (cmd.indexOf('$ ls') !== -1) {
		processingDir = true;
	}
});

let subdirLen = 0;
while (subdirLen !== largestNumSubdirs) {
	for (const [ dirName, dir ] of Object.entries(dirs)) {
		if (dir.subdirs.length === subdirLen) {
			dir.totalSize += dir.fileSize;
			for (const [ _, dir2 ] of Object.entries(dirs)) {
				if (dir2.subdirs.indexOf(dirName) !== -1) {
					dir2.totalSize += dir.totalSize;
				}
			}
		}
	}
	subdirLen = ++subdirLen;
}
console.log(dirs);

let sum = 0;
for (const [ _, dir ] of Object.entries(dirs)) {
	if (dir.totalSize <= 100000) {
		sum += dir.totalSize;
	}
}

console.log(sum);