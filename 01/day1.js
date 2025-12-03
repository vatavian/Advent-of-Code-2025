async function readFile(filePath) { 
     try {
        const file = Bun.file(filePath);
        const content = await file.text();
        let position = 50;
        let zeroCount = 0;
        console.log('The dial starts pointing at ', position);
        content.split(/\r?\n/).forEach(line => {
            const direction = line.substring(0,1);
            const distance = parseInt(line.substring(1));
            if (direction === 'R') {
                position += distance;
                position = position % 100;
                // console.log('line', line, 'The dial is rotated right ', distance, ' to ', position);
            }
            else if (direction === 'L') {
                position -= distance;
                while (position < 0) position += 100;
                // console.log('line', line, 'The dial is rotated left ', distance, ' to ', position);
            } else {
                console.log('line', line, 'does not start with R or L.');
                if (position === 0) zeroCount -= 1;
            }
            if (position === 0) zeroCount += 1;
        });
        console.log("zeroCount (part 1): " + zeroCount);
      } catch (error) {
        console.error('Error reading file:', error);
      }
}

readFile('./input.txt');
