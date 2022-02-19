exports.parseInput = (filePath, keyToSortBy) => {
    const { readFileSync } = require('fs');
    const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
    const parseData = (fileData) => {
        const lines = fileData.split('\n');
        return lines.filter(str => str !== '').map(e => {
            // remove collision for tree
            if(e.startsWith('$total')) e = '$' + e;
            return e.split('|');
        })
    };
    const rows = parseData(fileContent);

    // determining the index of sorting key,
    // let's say you want to filter the 2D array by 'net_sales'
    const header = rows[0];
    // Counting the N variable
    // property1, property2, .... propertyN-1
    const depth = (header.filter(r => r.startsWith('property')).length) - 1;

    rows.splice(0, 1);
    const props = header.filter(r => !r.startsWith('property'));
    const keyIndex = props.findIndex(r => r === keyToSortBy);
    
    return {
        keyIndex, depth, rows, header
    }
}