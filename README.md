# `nhs-number-generator`

This is a TypeScript port of Iain Stenson’s Python [nhs_number_generator](https://github.com/Iain-S/nhs_number_generator).

## Installation

```bash
npm install nhs-number-generator
yarn add nhs-number-generator
pnpm add nhs-number-generator
bun i nhs-number-generator
# etc
```

## Usage

This package exposes two [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*): one for random generation and one for deterministic generation of NHS numbers.

### Random generation

```typescript
import { randomNhsNumberGenerator } from 'nhs-number-generator';

const generator = randomNhsNumberGenerator();

console.log(generator.next().value); // "9198754017"
console.log(generator.next().value); // "9826183628"
console.log(generator.next().value); // "9689628313"
```

### Deterministic generation

To generate the same sequence of numbers repeatedly, use the `deterministicNhsNumberGenerator` function with the same seed value.

```typescript
import { deterministicNhsNumberGenerator } from 'nhs-number-generator';

const generator = deterministicNhsNumberGenerator('seed');

const firstValue = generator.next().value;
const secondValue = generator.next().value;
const thirdValue = generator.next().value;
```
