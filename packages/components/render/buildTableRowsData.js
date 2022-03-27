const buildTableRowsData = (node, depth = 0, result = []) => {
  result.push({ node, depth });

  node.children && Object.keys(node.children).forEach(key => buildTableRowsData(node.children[key], depth + 1, result));

  return result;
};

export default buildTableRowsData;