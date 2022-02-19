const fs = require('fs');
const { join } = require('path');
const { isNumeric } = require('./helpers');
const { parseInput } = require('./input');
const Tree = require('./tree');

const { rows, depth, keyIndex, header } = parseInput(join(__dirname , '..', 'input/data-big-input.txt'), 'net_sales');


// Main idea:
// is to convert the 2D array into a tree where each key will group its children
// so we can sort the leaves and get out equation done
const treeInstance = new Tree(depth); 


// converting into tree
const rootNode = treeInstance.createFrom2DArray(rows);


// writing tree into JSON file
fs.writeFileSync('tree.json', JSON.stringify(rootNode, null, 2));


// defining the comparable function which will sort the leaves
treeInstance.sort(rootNode, (b,a) => {
    if(b['name'].includes('$total')) return -1;
    let aV =  a['values'][keyIndex];
    let bV = b['values'][keyIndex];
    aV = isNumeric(aV) ? +aV : aV;
    bV = isNumeric(bV) ? +bV : bV;
    return aV > bV ? 1 : aV < bV ? -1 : 0;
});

treeInstance.output(rootNode, header, './output.txt');
