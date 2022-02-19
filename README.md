## Hierarchical Sort

<b>Main idea:</b>
Solving the hierarchical sort by steps that consist of:
* Parsing the input file and use a 2D array to represent it
* Converting the 2D array into grouped leaves & nodes, hence a Tree
* Sorting the leaves and going up
* Re-structure the output file from the tree, hence converting tree to 2D array
* Writing the results


### Usage
Firstly, you have to hit

> npm i

use the following command to hit the tests:

> npm run test

the result must be generated as two files for each test-case
* data-<big/small>-output.txt // which represents the sorted file
* <big/small>-data-tree.json // which represents the tree generated for the 2D array



Note:

I shouda turn the first key of any line that starts with `$total` by `$$total` to remove the collision while building the tree
