// Day 4: Printing Department

let rollRows = [];
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

function accessibleRolls() {
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
        rollRows = content.split(/\r?\n/).map(rowText => rowText.split(''));
        numRows = rollRows.length;
        numCols = rollRows[0].length;

        console.log('accessibleRolls part 1:', accessibleRolls());
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
