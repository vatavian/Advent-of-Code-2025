// Day 4: Printing Department

let rollRows = [];
let accessibleRollsMap = [];
let numRows = 0;
let numCols = 0;

function countNeighbors(checkRow, checkCol) {
    let count = 0;
    for (let row = checkRow - 1; row <= checkRow + 1; row++)
        for (let col = checkCol-1; col <= checkCol + 1; col++) {
            if ((row !== checkRow || col !== checkCol)
                && row >= 0 && col >= 0 && row < numRows && col < numCols
                && rollRows[row][col] === '@')
                {
                    count++;
                }
        }
    return count;
}

function accessibleRollsCount() {
    let accessible = 0;
    for (let scanRow = 0; scanRow < numRows; scanRow++)
        for (let scanCol = 0; scanCol < numCols; scanCol++) {
            if (rollRows[scanRow][scanCol] === '@' && countNeighbors(scanRow, scanCol) < 4)
                accessible++;
        }
    return accessible;
}

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        const origRollRows = content.split(/\r?\n/).map(rowText => rowText.split(''));
        rollRows = origRollRows.map(row => row.slice());
        numRows = rollRows.length;
        numCols = rollRows[0].length;
        console.log('accessibleRollsCount (part 1):', accessibleRollsCount());
        let totalRemoved = 0;
        let removedThisRound = 0;
        do {
            removedThisRound = 0;
            const accessibleRollsThisRound = rollRows.map(row => row.slice());
            for (let scanRow = 0; scanRow < numRows; scanRow++)
                for (let scanCol = 0; scanCol < numCols; scanCol++)
                    if (rollRows[scanRow][scanCol] === '@' && countNeighbors(scanRow, scanCol) < 4) {
                        accessibleRollsThisRound[scanRow][scanCol] = 'x';
                        removedThisRound++;
                    }
            // console.log("Remove", removedThisRound);
            totalRemoved += removedThisRound;
            rollRows = accessibleRollsThisRound;
        } while (removedThisRound > 0);
        console.log("Part 2: Removed a total of ", totalRemoved);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
