const findNode = (object, path) => (path === '' ? object : path.split('/').reduce((current, segment) => current.children[segment], object));

export default findNode;
