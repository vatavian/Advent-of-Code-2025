// Day 3: Lobby: Maximum Joltage

function maxJoltage1(ratingsStr) {
    const digits = ratingsStr.length;
    let max = 0;
    for (let i10s = 0; i10s < digits-1; i10s++) {
        let tens = 10 * parseInt(ratingsStr.substring(i10s, i10s + 1));
        for (let i1s = i10s + 1; i1s < digits; i1s++) {
            const joltage = tens + parseInt(ratingsStr.substring(i1s, i1s + 1));
            if (joltage > max) max = joltage;
        }
    }
    return max;
}

// Works fine for sample, but is too slow on larger input and does not use BigInt
// function maxJoltage2a(numResultDigits, batteriesStr) {
//     if (numResultDigits === 1)
//         return Math.max(...[...batteriesStr].map(ch => parseInt(ch)));
//     const numBatteries = batteriesStr.length;
//     if (numBatteries <= numResultDigits)
//         return parseInt(batteriesStr);
//     let max = 0;
//     for (let i = 0; i <= numBatteries-numResultDigits; i++) {
//         if (numResultDigits === 12) process.stdout.write(`${i}/${numBatteries-numResultDigits}, `);
//         let iDigit = batteriesStr.substring(i, i + 1);
//         const maxNext = maxJoltage2(numResultDigits-1, batteriesStr.substring(i+1));
//         const joltage = parseInt(`${iDigit}${maxNext}`);
//         if (joltage > max) max = joltage;
//     }
//     return max;
// }

// stores computed maximum values. Indexed first by number of rightmost batteries of the bank
// then next level max values are keyed by number of remaining digits to select.
// Must be reset for each new bank of batteries.
// knownMaxes[numBatteries]?.[numResultDigits]
let knownMaxes = {};

function maxJoltage2(numResultDigits, batteriesStr) {
    const numBatteries = batteriesStr.length;
    const knownMax = knownMaxes[numBatteries]?.[numResultDigits];
    if (knownMax)
        return knownMax;
    let max = 0n;
    if (numResultDigits === 1)
        max = BigInt(Math.max(...[...batteriesStr].map(ch => parseInt(ch))));
    else if (numBatteries <= numResultDigits)
        max = BigInt(batteriesStr);
    else {
        for (let i = 0; i <= numBatteries-numResultDigits; i++) {
            // if (numResultDigits === 12) process.stdout.write(`${i}/${numBatteries-numResultDigits}, `);
            let iDigit = batteriesStr.substring(i, i + 1);
            const maxNext = maxJoltage2(numResultDigits-1, batteriesStr.substring(i+1));
            const joltage = BigInt(`${iDigit}${maxNext}`);
            if (joltage > max)
                max = joltage;
        }
    }
    if (!knownMaxes[numBatteries])
        knownMaxes[numBatteries] = {};
    knownMaxes[numBatteries][numResultDigits] = max;
    return max;
}


async function readFile(filePath) { 
     try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let maxJoltageSum1 = 0;
        let maxJoltageSum2 = 0n;
        const batteryBanks = content.split(/\r?\n/);
        batteryBanks.forEach(bank => {
            knownMaxes = {};
            const bankJoltage1 = maxJoltage1(bank);
            // console.log('bank joltage1 for', bank, '=', bankJoltage1);
            maxJoltageSum1 += bankJoltage1;
            const bankJoltage2 = maxJoltage2(12, bank);
            // console.log('bank joltage2 for', bank, '=', bankJoltage2);
            maxJoltageSum2 += bankJoltage2;
        });
        console.log('Sum of max joltages part 1:', maxJoltageSum1);
        console.log('Sum of max joltages part 2:', maxJoltageSum2);
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
