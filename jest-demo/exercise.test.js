const lib = require("./exercise");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => lib.fizzBuzz("")).toThrow();
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if input is divisible by 3 not 5", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if input is divisible by 5 not 3", () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return input if it is not be divisible by 3 or 5 ", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
