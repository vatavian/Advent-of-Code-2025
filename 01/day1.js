async function readFile(filePath) { 
     try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let position = 50;
        let zeroCount1 = 0;
        let zeroCount2 = 0;
        console.log('The dial starts pointing at ', position);
        content.split(/\r?\n/).forEach(line => {
            const direction = line.substring(0,1);
            const distance = parseInt(line.substring(1));
            if (direction === 'R') {
                for (let turned = 0; turned < distance; turned++) {
                    position += 1;
                    if (position > 99) {
                        position = 0;
                        zeroCount2 += 1;
                    }
                }
                // console.log('line', line, 'The dial is rotated right ', distance, ' to ', position);
            }
            else if (direction === 'L') {
                for (let turned = 0; turned < distance; turned++) {
                    position -= 1;
                    if (position === 0)
                        zeroCount2 += 1;
                    else if (position < 0)
                        position = 99;
                }
                // console.log('line', line, 'The dial is rotated left ', distance, ' to ', position);
            } else {
                console.log('line', line, 'does not start with R or L.');
            }
            if (position === 0) zeroCount1 += 1;
        });
        console.log("Ending on zero count (part 1): " + zeroCount1);
        console.log("Passing zero or ending on it (part 2): " + zeroCount2);
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
