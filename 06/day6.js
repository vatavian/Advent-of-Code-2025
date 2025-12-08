// Day 6: Trash Compactor

const AVAILABLE_OPERATORS = '+*';
const OPERATORS_RE = /[\+\*]/;
let values = [];
let lines = [];
let operatorsLine = '';

function addVals1(index) {
    let total = 0n;
    values.forEach(valArray => total += valArray[index]);
    // console.log(index,": + total", total);
    return total;
}

function multVals1(index) {
    let total = 1n;
    values.forEach(valArray => total *= valArray[index]);
    // console.log(index,": * total", total);
    return total;
}

function getColumnValues2(startIndex, endBeforeIndex) {
    const vals = {};
    for (let index=startIndex; index< endBeforeIndex; index++) {
        lines.forEach( line => {
            const ch = line[index].trim();
            if (ch) {
                vals[index] = `${vals[index] || ''}${ch}`;
            }
        })
    }
    return Object.values(vals);
}

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let operators = [];
        lines = content.split(/\r?\n/);
        lines.forEach(line => {
            const vals = line.trim().split(/\s+/);
            if (vals[0].length === 1 && AVAILABLE_OPERATORS.indexOf(vals[0]) > -1)
                operators = vals;
            else
                values.push(vals.map(v => BigInt(v)));
        });
        let grandTotal1 = 0n;
        operators.forEach((op, index) => {
            grandTotal1 += (op === '+') ? addVals1(index) : multVals1(index);
        })
        console.log('Part 1: grand total', grandTotal1);

        let grandTotal2 = 0n;
        operatorsLine = lines.pop();
        let lastOpIndex = operatorsLine.length;
        for (let opIndex=Math.max(operatorsLine.lastIndexOf('+'), operatorsLine.lastIndexOf('*'));
             opIndex >= 0;
             opIndex=Math.max(operatorsLine.lastIndexOf('+', opIndex-1), operatorsLine.lastIndexOf('*', opIndex-1)))
        {
            const op = operatorsLine.substring(opIndex, opIndex + 1);
            const colValues = getColumnValues2(opIndex, lastOpIndex);
            // console.log('op', op, opIndex, '-', lastOpIndex, 'colValues', colValues);
            if (op == '+') {
                colValues.forEach(v => grandTotal2 += BigInt(v));
            } else {
                let mult = 1n;
                colValues.forEach(v => mult *= BigInt(v));
                grandTotal2 += mult;
            }
            lastOpIndex = opIndex;
            if (lastOpIndex === 0) break;
        }
        console.log('Part 2: grand total', grandTotal2);

    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
