export const BRANCH_NODE = 'branch';
export const LEAF_NODE = 'leaf';

export const buildCoverageTree = (coverage) => {
    const root = { type: BRANCH_NODE, name: undefined, children: {}, path: '' };

    Object.keys(coverage).forEach((path) => {
        let currentNode = root;
        let currentPath = root.path;
        const segments = path.split('/');
        segments.forEach((segment, index) => {
            currentPath = `${currentPath}/${segment}`;
            if (!Object.hasOwnProperty.call(currentNode.children, segment)) {
                if (index < segments.length - 1) {
                    currentNode.children[segment] = { type: BRANCH_NODE, name: segment, children: {}, path: currentPath };
                } else {
                    currentNode.children[segment] = { type: LEAF_NODE, name: segment, children: undefined, path };
                }
            }

            currentNode = currentNode.children[segment];
        });
    });

    return root;
}