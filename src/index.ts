type Range = [number, number];

const checkDigitWeights: { [key: number]: number } = {
  0: 10,
  1: 9,
  2: 8,
  3: 7,
  4: 6,
  5: 5,
  6: 4,
  7: 3,
  8: 2,
};

function calculateCheckDigit(nhsNumber: string): number {
  const products = Array.from(nhsNumber).map(
    (digit, i) => parseInt(digit) * checkDigitWeights[i]
  );
  const sumProducts = products.reduce((sum, product) => sum + product, 0);
  const remainder = sumProducts % 11;
  const elevenMinusRemainder = 11 - remainder;

  return elevenMinusRemainder === 11 ? 0 : elevenMinusRemainder;
}

export function* deterministicNhsNumberGenerator(
  ranges: Range[] = [
    [400000000, 499999999],
    [600000000, 708800001],
  ]
): Generator<string> {
  for (const [low, high] of ranges) {
    if (high < low) {
      throw new Error(
        "The high end of the range should not be lower than the low end."
      );
    }

    if (high - low === 0) {
      const onlyPossibleCheckDigit = calculateCheckDigit(
        `${low}`.padStart(9, "0")
      );
      if (onlyPossibleCheckDigit === 10) {
        throw new Error(`${low} is not a valid NHS number.`);
      }
    }

    for (let i = low; i <= high; i++) {
      const candidateNumber = `${i}`.padStart(9, "0");
      const checkDigit = calculateCheckDigit(candidateNumber);

      if (checkDigit !== 10) {
        yield candidateNumber + checkDigit;
      }
    }
  }
}

export function* randomNhsNumberGenerator(
  ranges: Range[] = [
    [400000000, 499999999],
    [600000000, 708800001],
  ]
): Generator<string> {
  while (true) {
    const [low, high] = ranges[Math.floor(Math.random() * ranges.length)];
    const candidateNumber = `${Math.floor(
      Math.random() * (high - low + 1) + low
    )}`.padStart(9, "0");
    const checkDigit = calculateCheckDigit(candidateNumber);

    if (checkDigit !== 10) {
      yield candidateNumber + checkDigit;
    }
  }
}

function addSeparators(nhsNumber: string, separator: string = " "): string {
  return `${nhsNumber.slice(0, 3)}${separator}${nhsNumber.slice(
    3,
    6
  )}${separator}${nhsNumber.slice(6)}`;
}

function removeSeparators(nhsNumber: string): string {
  if (!nhsNumber[3].match(/\d/) && !nhsNumber[7].match(/\d/)) {
    return `${nhsNumber.slice(0, 3)}${nhsNumber.slice(4, 7)}${nhsNumber.slice(
      8
    )}`;
  }
  return nhsNumber;
}
