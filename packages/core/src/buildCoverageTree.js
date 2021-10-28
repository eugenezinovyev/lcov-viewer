import { BRANCH_NODE, LEAF_NODE } from './treeNodeTypes';

const defaultMetrics = () => ({
  lines: { total: 0, covered: 0 },
  functions: { total: 0, covered: 0 },
  branches: { total: 0, covered: 0 },
});

const statCategories = Object.keys(defaultMetrics());

const addMetrics = (aggregate, metrics) => {
  statCategories.forEach(category => {
    aggregate[category].total += metrics[category].total;
    aggregate[category].covered += metrics[category].covered;
  });
};

const buildCoverageTree = (coverage) => {
  const root = { type: BRANCH_NODE, name: 'All Files', children: {}, path: '', metrics: defaultMetrics() };
  
  Object.keys(coverage).forEach((path) => {
    let current = root;
    let currentPath = root.path;
    const segments = path.split('/');
    segments.forEach((segment, index) => {
      const isLeaf = index === segments.length - 1;
      currentPath = currentPath.length > 0 ? `${currentPath}/${segment}` : segment;
     
      if (!Object.hasOwnProperty.call(current.children, segment)) {
        current.children[segment] = {
          type: isLeaf ? LEAF_NODE : BRANCH_NODE,
          name: segment,
          children: {},
          path: currentPath,
          metrics: isLeaf ? coverage[path].metrics : defaultMetrics(),
          parent: current,
        };
      }

      if (isLeaf) {
        let currentAggregate = current;
        
        while(currentAggregate) {
          addMetrics(currentAggregate.metrics, coverage[path].metrics);
          currentAggregate = currentAggregate.parent;
        } 
      } else {
        current = current.children[segment];
      }
    });
  });

  return root;
};

export default buildCoverageTree;
