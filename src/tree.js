
module.exports = class Tree {
    constructor(depth) {
        this.depth = depth;
    }
    createFrom2DArray(array) {
        const node = (name, parent = null) => ({name, parent, children: [], values: []});
        const addNode = (parent, child) => (parent.children.push(child), child);
        const findNamedNode = (name, parent) => {
            for (const child of parent.children) {
                if (child.name === name) { return child }
                const found = findNamedNode(name, child);
                if (found) { return found }            
            }
        }
        const top = node('root');
        let current;
        for (const children of array) {
            current = top;
            let temp = this.depth;
            for (const name of children) {
                if(temp < 0) {
                    current['values'].push(name);
                } else {
                    const found = findNamedNode(name, current);
                    current = found ? found : addNode(current, node(name, current.name));
                    temp--;
                }
            }
        }
        return top;
    }

    sort(root, comparable) {
        const sortUntil = (node, cmp, depth) => {
            if(depth === 0) {
                // mean we reach the leaves so let's sort
                node.children.sort(comparable);
                return;
            }
            node['children'].sort(comparable);
            for(const child of node['children']) {
                sortUntil(child,  cmp, depth - 1);
            }
        }
        sortUntil(root, comparable, this.depth);
        
        
    }

    output(root, header, filePath) {
        // we've got our tree done and ready to be converted again into 2D array
        // that represents the sorted 2D, hence the answer
        const outputUntil = (root, depth, metrix, parentFullPath = '') => {
            if(depth === 0) {
                let items = '';
                root.children.forEach(item => {
                    let temp = '';
                    for(const v of item['values']) {
                        temp = temp === '' ? `${v}` : `${temp}|${v}`;
                    }
                    items = items === '' ? `${parentFullPath}|${item.name}|${temp}` : `${items}\n${parentFullPath}|${item.name}|${temp}`;
                });
                metrix.res = metrix.res === '' ? `${items}` : `${metrix.res}\n${items}`; 
            }
            for(const item of root['children']) {
                outputUntil(item, depth - 1, metrix, parentFullPath !== '' ? `${parentFullPath}|${item.name}` : `${item.name}`);
            }
        }
        const metrix = {res: `${header}`};
        outputUntil(root, this.depth, metrix);
        const { writeFileSync } = require('fs');
        writeFileSync(filePath, metrix.res, { encoding: 'utf-8' });
    }
}