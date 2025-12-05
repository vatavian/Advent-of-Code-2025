// Day 3: Lobby: Maximum Joltage

function maxJoltage(ratingsStr) {
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

async function readFile(filePath) { 
     try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let maxJoltageSum = 0;
        const batteryBanks = content.split(/\r?\n/);
        batteryBanks.forEach(bank => {
            const bankJoltage = maxJoltage(bank);
            console.log('bank joltage for', bank, '=', bankJoltage);
            maxJoltageSum += bankJoltage;
        });
        console.log('Sum of max joltages part 1:', maxJoltageSum);
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
