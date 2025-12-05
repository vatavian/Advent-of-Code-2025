// Day 2: Gift Shop

function isValid1(id) {
    const strID = `${id}`;
    const idLen = strID.length;
    let isValid = true;
    const subLen = idLen / 2;
    const subCount = idLen/subLen;
    if (Math.floor(subCount) === subCount) {
        const subStr = strID.substring(0, subLen);
        // console.log("Scanning", id, 'for substring', subStr);
        let matches = 0;
        for (let checkStart = subLen; checkStart < idLen; checkStart += subLen) {
            if (strID.substring(checkStart, subLen + checkStart) === subStr) matches++;
        }
        if (matches + 1 === subCount) {
            return false;
        }
    }
    return true;
}

function isValid2(id) {
    const strID = `${id}`;
    const idLen = strID.length;
    let isValid = true;
    const subLen = idLen / 2;
    for (let subLen = 1; subLen <= idLen / 2; subLen++) {
        const subCount = idLen/subLen;
        if (Math.floor(subCount) === subCount) {
            const subStr = strID.substring(0, subLen);
            let matches = 0;
            for (let checkStart = subLen; checkStart < idLen; checkStart += subLen) {
                if (strID.substring(checkStart, subLen + checkStart) === subStr) matches++;
            }
            if (matches + 1 === subCount) {
                return false;
            }
        }
    }
    return true;
}

async function readFile(filePath) { 
     try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let invalidSum1 = 0;
        let invalidSum2 = 0;
        const ranges = content.split(',');
        ranges.forEach(range => {
            if (range.substring(0,1) === '0') {
                console.log("Range starts with leading zero:", range);
            } else if (range.includes("-0")) {
                console.log("Range end has leading zero:", range);
            } else {
                const [rangeMin, rangeMax] = range.split('-').map(v => parseInt(v));
                for (let id = rangeMin; id <= rangeMax; id++) {
                    if (!isValid1(id)) invalidSum1 += id;
                    if (!isValid2(id)) invalidSum2 += id;
                }
            }
        });
        console.log('Sum of invalid IDs part 1:', invalidSum1, 'part 2:', invalidSum2);
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
