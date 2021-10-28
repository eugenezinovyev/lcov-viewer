const calculatePercentage = ({ covered, total }) => (total > 0 ? covered / total : 1) * 100;

export default calculatePercentage;
