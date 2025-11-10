/**
 * Hi Team, it cost me more less than 30 mins to address the problem,
 * I recorded the session from start to end but the uploading process still not complete yet,
 * I'll provide the link if you needed it on first time we meet.
 * Thank you
 */

// Iterative approach
// Complexity: time O(n), space O(1)
function iterative(n: number): number {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Formula
// complexity: time O(1) space O(1)
function formula(n: number): number {
  if (n <= 0) return 0;
  let sum = 0;
  sum = (n * (n + 1)) / 2;
  return sum;
}

// Recursive approach
// Complexity: time O(n) space O(n)
// Could be slowest and leading memory leak and seems unusable with n > 10.000
function recursive(n: number, acc: number = 0): number {
  if (n <= 0) return acc;
  return recursive(n - 1, acc + n); // 3,4 -> 2,7 -> return 10
}

const mock = [
  {
    input: 4,
    expect: 10,
    description: "Must be return 10",
  },
  {
    input: 0,
    expect: 0,
    description: "must returns 0",
  },
  {
    input: -5,
    expect: 0,
    description: "negative input , must returns 0",
  },
  {
    input: 100,
    expect: 5050,
    description: "large input",
  },
];

function tests() {
  console.log("Testing");
  mock.forEach(({ input, expect, description }) => {
    const first = iterative(input);
    const second = formula(input);
    const third = recursive(input);

    console.log(description);
    console.log(`Iterative: ${first} - ${first === expect ? "✅" : "🚫"}`);
    console.log(`Iterative: ${second} - ${second === expect ? "✅" : "🚫"}`);
    console.log(`Iterative: ${third} - ${third === expect ? "✅" : "🚫"}`);
  });
  console.log("----------");
  console.log("\n");
}

tests();

const largeInput = 1000;
const time = 100;

function performanceBenchmark() {
  console.log("Performance ");

  console.log(`Iteractive`);
  console.time("Iterative");
  iterative(largeInput);
  console.timeEnd("Iterative");

  console.log("\n");
  console.log("Formula");
  console.time("Formula");
  formula(largeInput);
  console.timeEnd("Formula");

  console.log("\n");
  console.log("Recursive");
  console.time("rec");
  recursive(largeInput);
  console.timeEnd("rec");

  console.log("\n");
}

performanceBenchmark();
