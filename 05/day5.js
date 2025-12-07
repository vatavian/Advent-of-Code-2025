// Day 5: Cafeteria: Ingredient Freshness

const START = 0;
const END = 1;
const processedRanges = [];
let numPossibleFreshIDs = 0;

function findOverlap(range1, range2) {
    if (range1[END] < range2[START] || range2[END] < range1[START])
        return null;
    return [Math.max(range1[START], range2[START]), Math.min(range1[END], range2[END])];
}

// Return an array of zero or more sections of aRange that do not overlap global processedRanges
function removeOverlapsWithprocessedRanges(aRange) {
    let rangesLeftAfterRemoving = [aRange];
    processedRanges.forEach(processedRange => {
        for (let iLeft = 0; iLeft < rangesLeftAfterRemoving.length; iLeft++) {
            const newRange = rangesLeftAfterRemoving[iLeft];
            const overlap = findOverlap(newRange, processedRange);
            if (overlap) {
                if (overlap[START] === newRange[START]) { // Overlap starts at beginning of newRange
                    if (overlap[END] === newRange[END]) { // Complete overlap, remove newRange
                        // console.log('Removing ', newRange, 're: overlap', overlap, 'with', processedRange);
                        rangesLeftAfterRemoving.splice(iLeft, 1);
                        iLeft--; // Next range has been moved into this one's position, don't skip it in next iteration
                    } else {
                        const replaceNewRange = [overlap[END]+1, newRange[END]];
                        // console.log('Replacing ', newRange, 'with', replaceNewRange, 're: start overlap', overlap, 'with', processedRange);
                        rangesLeftAfterRemoving[iLeft] = replaceNewRange;
                    }
                } else if (overlap[END] === newRange[END]) { // Overlap ends at end of newRange
                    const replaceNewRange = [newRange[START], overlap[START]-1];
                    // console.log('Replacing ', newRange, 'with', replaceNewRange, 're: end overlap', overlap, 'with', processedRange);
                    rangesLeftAfterRemoving[iLeft] = replaceNewRange;
                } else { // Overlap starts and ends within newRange, replace newRange with two ranges
                    const replaceNewRange1 = [newRange[START], overlap[START]-1];
                    const replaceNewRange2 = [overlap[END]+1, newRange[END]];
                    // console.log('Replacing ', newRange, 'with', replaceNewRange1, 'and', replaceNewRange2, 're: end overlap', overlap, 'with', processedRange);
                    rangesLeftAfterRemoving.splice(iLeft, 1, replaceNewRange1, replaceNewRange2);
                }
            }
        }
    })
    return rangesLeftAfterRemoving;
}

function addRange(newRange) {
    if (numPossibleFreshIDs === 0) {
        numPossibleFreshIDs = newRange[END] - newRange[START] + 1;
        processedRanges.push(newRange);
    } else {
        const newNonOverlappingRanges = removeOverlapsWithprocessedRanges(newRange);
        newNonOverlappingRanges.forEach(range => numPossibleFreshIDs += range[END] - range[START] + 1);
        processedRanges.push(...newNonOverlappingRanges);
    }
}

async function readFile(filePath) { 
    try {
        const file = Bun.file(filePath);
        const content = await file.text();
        const freshRanges = [];
        let freshCount = 0;
        content.split(/\r?\n/).forEach(line => {
            const vals = line.split('-');
            if (vals.length == 2) {
                const newRange = vals.map(v => parseInt(v));
                freshRanges.push(newRange);
                addRange(newRange)
            }
            else {
                let id = parseInt(vals[0]);
                if (id > 0 && freshRanges.some(range => (id >= range[0] && id <= range[END])))
                    freshCount += 1;
            }
        });
        console.log('Part 1: fresh count ', freshCount);
        
        // The following works for sample but is way too slow for full input:
        // let freshMinID = -1;
        // let freshMaxID = 0;
        // freshRanges.forEach(range => {
        //     if (freshMinID < 0 || range[START] < freshMinID)
        //         freshMinID = range[START];
        //     if (range[END] > freshMaxID)
        //         freshMaxID = range[END];
        // })
        // console.log('Checking', freshMaxID - freshMinID, 'IDs');
        // numPossibleFreshIDs = 0;
        // for (let id=freshMinID; id <= freshMaxID; id++)
        //     if (freshRanges.some(range => (id >= range[START] && id <= range[END])))
        //         numPossibleFreshIDs++;
        console.log('Part 2: numPossibleFreshIDs', numPossibleFreshIDs);

    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readFile('./input.txt');
