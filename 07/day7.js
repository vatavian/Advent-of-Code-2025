// Day 7: Laboratories: Tachyon beam splitting

let manifold = [];
let numRows = 0;
let numCols = 0;

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        const manifold = content.split(/\r?\n/);
        numRows = manifold.length;
        numCols = manifold[0].length;
        let beamColumns = new Set();
        let splitCount = 0;
        for (let scanRow = 0; scanRow < numRows; scanRow++)
            if (scanRow === 0)
                beamColumns.add(manifold[scanRow].indexOf('S'));
            else {
                const rowColumns = manifold[scanRow].split('');
                const nextBeams = new Set();
                beamColumns.forEach(beamColumn => {
                    if (rowColumns[beamColumn] == '.')
                        nextBeams.add(beamColumn);
                    else if (rowColumns[beamColumn] == '^') {
                        splitCount++;
                        nextBeams.add(beamColumn-1);
                        nextBeams.add(beamColumn+1);
                    } else
                        console.log("Unknown manifold char at row", scanRow, "column", beamColumn);
                })
                beamColumns = nextBeams;
            }
        console.log('splitCount', splitCount);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
