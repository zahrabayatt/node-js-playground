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
    // toBe matcher compare the references
    //expect(result).toBe({ id: 1, price: 10 });

    // use toEqual to compare the values
    // expect(result).toEqual({ id: 1, price: 10 });

    // better way is to use toMatchObject because if you add property to object it only check the object has these the property that you except and don't care about of other properties
    expect(result).toMatchObject({ id: 1, price: 10 });
    // or you can use toHaveProperty to check if specific property is exist
    //expect(result).toHaveProperty("id", 1);
  });
});
