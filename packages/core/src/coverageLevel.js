export const GOOD_COVERAGE_THRESHOLD = 80;
export const NORMAL_COVERAGE_THRESHOLD = 60;

export const COVERAGE_QUALITY_LEVEL_BAD = 0;
export const COVERAGE_QUALITY_LEVEL_NORMAL = 1;
export const COVERAGE_QUALITY_LEVEL_GOOD = 2;

export const resolveCoverageLevel = (coverage) => {
  if (coverage >= GOOD_COVERAGE_THRESHOLD) {
    return COVERAGE_QUALITY_LEVEL_GOOD;
  } else if (coverage >= NORMAL_COVERAGE_THRESHOLD) {
    return COVERAGE_QUALITY_LEVEL_NORMAL;
  } else {
    return COVERAGE_QUALITY_LEVEL_BAD;
  }
};

export const resolveCoverageClass = (coverage, { good, normal, bad }) => {
  const level = resolveCoverageLevel(coverage);

  switch (level) {
    case COVERAGE_QUALITY_LEVEL_GOOD: return good;
    case COVERAGE_QUALITY_LEVEL_NORMAL: return normal;
    case COVERAGE_QUALITY_LEVEL_BAD: return bad;
    default: return null;
  }
};