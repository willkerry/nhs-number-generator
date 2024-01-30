import { expect, test } from "bun:test";
import nhsNumber from "nhs-number-validator";
import {
  deterministicNhsNumberGenerator,
  randomNhsNumberGenerator,
} from "./index";

const generateMillionRandomNhsNumbers = () => {
  const generator = randomNhsNumberGenerator();
  const result = [];
  for (let i = 0; i < 1_000_000; i++) {
    result.push(generator.next().value);
  }
  return result;
};

const generateMillionDeterministicNhsNumbers = () => {
  const generator = deterministicNhsNumberGenerator();
  const result = [];
  for (let i = 0; i < 1_000_000; i++) {
    result.push(generator.next().value);
  }
  return result;
};

test("deterministicNhsNumberGenerator", () => {
  const numbers = generateMillionDeterministicNhsNumbers();
  expect(numbers.length).toBe(1_000_000);

  for (const number of numbers) {
    expect(nhsNumber.validate(number)).toBe(true);
  }
});

test("randomNhsNumberGenerator", () => {
  const numbers = generateMillionRandomNhsNumbers();
  expect(numbers.length).toBe(1_000_000);

  for (const number of numbers) {
    expect(nhsNumber.validate(number)).toBe(true);
  }
});
