const findNode = (object, path) => path.replace(/^\//, '').split('/').reduce((current, segment) => current.children[segment], object);

export default findNode;
