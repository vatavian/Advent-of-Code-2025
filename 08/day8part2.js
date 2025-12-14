// Day 8 Part 2: Playground: Connecting junction boxes in 3D
// https://adventofcode.com/2025/day/8

let edges = [];
let connectionCount = 0;

// Find the set of nodes reachable from startConnIndex using the first connectionCount entries of edges
function findWholeCircuit(circuitIndex, startConnIndex) {
    edges[startConnIndex][3] = circuitIndex;
    // console.log(circuitIndex, 'added', startConnIndex, ':', edges[startConnIndex]);
    let node0 = edges[startConnIndex][0];
    let node1 = edges[startConnIndex][1];
    let nodes = new Set([node0, node1]);
    for (let otherConnIndex = 0; otherConnIndex < connectionCount; otherConnIndex++)
        if (edges[otherConnIndex][3] < circuitIndex &&
            (edges[otherConnIndex][0] === node0 ||
             edges[otherConnIndex][0] === node1 ||
             edges[otherConnIndex][1] === node0 ||
             edges[otherConnIndex][1] === node1))
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
        let jIndex1 = 0;
        let jIndex2 = 0;
        for (jIndex1 = 0; jIndex1 < numJunctions-1; jIndex1++)
            for (jIndex2 = jIndex1+1; jIndex2 < numJunctions; jIndex2++) {
                const j1 = junctions[jIndex1];
                const j2 = junctions[jIndex2];
                edges.push([jIndex1, jIndex2, Math.sqrt((j1[0]-j2[0]) ** 2 + (j1[1]-j2[1]) ** 2 + (j1[2]-j2[2]) ** 2), 0]);
            }
        edges.sort((a, b) => a[2] - b[2]);
        // console.log('sorted edges:', edges);
        connectionCount = Math.min(1000, edges.length);
        let circuitIndex = 1;
        let firstCircuitSet = findWholeCircuit(circuitIndex, 0);
        while (firstCircuitSet.size < numJunctions) {
            circuitIndex++;
            connectionCount++;
            firstCircuitSet = findWholeCircuit(circuitIndex, 0);
        }
        const lastEdge = edges[connectionCount-1];
        console.log('last/longest connection that made a complete circuit:', lastEdge);
        const j1 = junctions[lastEdge[0]];
        const j2 = junctions[lastEdge[1]];
        console.log('from junction:', j1, 'to', j2);
        console.log(j1[0], '*', j2[0], '=', j1[0] * j2[0]);
        // const countValues = Object.values(circuitCounts);
        // countValues.sort((a,b) => b - a);
        // const top3 = countValues.slice(0, 3)
        // console.log(top3, ' multiplied = ', top3[0]*top3[1]*top3[2]);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
