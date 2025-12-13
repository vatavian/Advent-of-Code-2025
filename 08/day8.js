// Day 8: Playground: Connecting junction boxes in 3D
// https://adventofcode.com/2025/day/8

let connections = [];

function findWholeCircuit(circuitIndex, startConnIndex) {
    connections[startConnIndex][3] = circuitIndex;
    // console.log(circuitIndex, 'added', startConnIndex, ':', connections[startConnIndex]);
    let node0 = connections[startConnIndex][0];
    let node1 = connections[startConnIndex][1];
    let nodes = new Set([node0, node1]);
    for (let otherConnIndex = 0; otherConnIndex < connections.length; otherConnIndex++)
        if (connections[otherConnIndex][3] === 0 &&
            (connections[otherConnIndex][0] === node0 ||
             connections[otherConnIndex][0] === node1 ||
             connections[otherConnIndex][1] === node0 ||
             connections[otherConnIndex][1] === node1))
            nodes = nodes.union(findWholeCircuit(circuitIndex, otherConnIndex));
    return nodes;
}

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        const lines = content.split(/\r?\n/);
        const junctions = lines.map(line => line.split(',')).map(a => a.map(v => parseInt(v)));
        // console.log(junctions);
        const numJunctions = junctions.length;
        let distances = [];
        let jIndex1 = 0;
        let jIndex2 = 0;
        for (jIndex1 = 0; jIndex1 < numJunctions-1; jIndex1++)
            for (jIndex2 = jIndex1+1; jIndex2 < numJunctions; jIndex2++) {
                const j1 = junctions[jIndex1];
                const j2 = junctions[jIndex2];
                distances.push([jIndex1, jIndex2, Math.sqrt((j1[0]-j2[0]) ** 2 + (j1[1]-j2[1]) ** 2 + (j1[2]-j2[2]) ** 2), 0]);
            }
        distances.sort((a, b) => a[2] - b[2]);
        // console.log('sorted distances:', distances);
        const limit = Math.min(1000, distances.length);
        connections = distances.slice(0, limit);
        let circuitCounts = {};
        let circuitIndex = 1;
        for (jIndex1 = 0; jIndex1 < connections.length; jIndex1++) {
            if (connections[jIndex1][3] === 0) {
                // console.log(circuitIndex, 'starting at connection', jIndex1);
                circuitCounts[circuitIndex] = findWholeCircuit(circuitIndex, jIndex1).size;
                circuitIndex++;
            }
        }
        console.log(JSON.stringify(circuitCounts));
        const countValues = Object.values(circuitCounts);
        countValues.sort((a,b) => b - a);
        const top3 = countValues.slice(0, 3)
        console.log(top3, ' multiplied = ', top3[0]*top3[1]*top3[2]);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
