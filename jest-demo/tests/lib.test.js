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
    expect(result).toMatch(/Zahra/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // falsy value in JS:
    // Null
    // undefined
    // NaN
    // ''
    // 0
    // false
    const args = [null, undefined, NaN, "", 0, false];

    args.forEach((a) => {
      expect(() => {
        lib.registerUser(null);
      }).toThrow();
    });
  });

  // or you can write test like this:
  //%s in the test name is a placeholder for the current value, making the test output clearer.
  it.each([null, undefined, NaN, "", 0, false])(
    "should throw if username is falsy (%s)",
    (falsyValue) => {
      expect(() => {
        lib.registerUser(falsyValue);
      }).toThrow();
    }
  );

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Zahra");
    expect(result).toMatchObject({ username: "Zahra" });
    expect(result.id).toBeGreaterThan(0);
  });
});
