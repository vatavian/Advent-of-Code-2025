// Day 5: Cafeteria: Ingredient Freshness


async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        const freshRanges = [];
        let freshCount = 0;
        content.split(/\r?\n/).forEach(line => {
            const vals = line.split('-');
            if (vals.length == 2)
                freshRanges.push(vals.map(v => parseInt(v)));
            else {
                let id = parseInt(vals[0]);
                if (id > 0 && freshRanges.some(range => (id >= range[0] && id <= range[1])))
                    freshCount += 1;
            }
        });
        console.log('freshRanges', JSON.stringify(freshRanges));
        console.log("Part 1: fresh count ", freshCount);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
