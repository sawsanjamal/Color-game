export function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomValueInRange(options) {
  const ranges = validRanges(options);
  const range = ranges[randomNumber({ max: ranges.length - 1 })];
  return randomNumber(range);
}
function validRanges({
  startingValue,
  maxCutOff,
  withinTolerance,
  outsideTolerance,
}) {
  const withinToleranceIncrementor = Math.floor(withinTolerance * maxCutOff);
  const outsideToleranceIncrementor = Math.ceil(outsideTolerance * maxCutOff);
  const aboveRangeMax = Math.min(
    startingValue + withinToleranceIncrementor,
    maxCutOff
  );
  const aboveRangeMin = startingValue + outsideToleranceIncrementor;
  const belowRangeMin = Math.max(startingValue - withinToleranceIncrementor, 0);
  const belowRangeMax = startingValue - outsideToleranceIncrementor;
  const ranges = [];
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMin, max: aboveRangeMax });
  }
  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax });
  }
  return ranges;
}
