import vdfParser from "vdf-parser";
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read())) {      
        process.stdout.write(
            JSON.stringify(vdfParser.parse(chunk.toString()))
        );
    }
});