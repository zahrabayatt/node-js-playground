const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 number if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Zahra");
    // Use toMatch instead of toBe because toBe checks for exact equality, making the test fragile if small changes (like punctuation) are introduced in the string.
    // test not should be too specific or general!
    expect(result).toMatch(/Zahra/);
    // or
    // expect(result).toContain("Zahra");
  });
});
