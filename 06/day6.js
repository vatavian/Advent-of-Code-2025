// Day 6: Trash Compactor

const AVAILABLE_OPERATORS = '+*';
let values = [];

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

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let operators = [];
        content.split(/\r?\n/).forEach(line => {
            const vals = line.trim().split(/\s+/);
            if (vals[0].length === 1 && AVAILABLE_OPERATORS.indexOf(vals[0]) > -1)
                operators = vals;
            else
                values.push(vals.map(v => BigInt(v)));
        });
        // console.log(values);
        // console.log(JSON.stringify(operators));
        let grandTotal1 = 0n;
        operators.forEach((op, index) => {
            // console.log(op);
            grandTotal1 += (op === '+') ? addVals1(index) : multVals1(index);
        })
        console.log('Part 1: grand total', grandTotal1);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
