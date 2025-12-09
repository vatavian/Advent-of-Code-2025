// Day 7: Laboratories: Tachyon beam splitting
// https://adventofcode.com/2025/day/7#part2
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
        let beamColumns = {};
        for (let scanRow = 0; scanRow < numRows; scanRow++)
            if (scanRow === 0)
                beamColumns[manifold[scanRow].indexOf('S')] = 1n;
            else {
                const rowColumns = manifold[scanRow].split('');
                const nextBeams = {};
                for (const [beamColumn, count] of Object.entries(beamColumns)) {
                    const col = parseInt(beamColumn);
                    if (rowColumns[col] === '.')
                        nextBeams[col] = count + (nextBeams[col] || 0n);
                    else if (rowColumns[col] === '^') {
                        nextBeams[col-1] = count + (nextBeams[col-1] || 0n);
                        nextBeams[col+1] = count + (nextBeams[col+1] || 0n);
                    } else
                        console.log("Unknown manifold char at row", scanRow, "column", beamColumn);
                }
                beamColumns = nextBeams;
            }
        // console.log('beamColumns:', beamColumns);
        const totalTimelines = Object.values(beamColumns).reduce((total, v) => total + v, 0n);
        console.log('different timelines:', totalTimelines);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
