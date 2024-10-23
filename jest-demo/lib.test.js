const lib = require("./lib");
const db = require("./db");
const mail = require("./mail");

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
    const args = [null, undefined, NaN, "", 0, false];

    args.forEach((a) => {
      expect(() => {
        lib.registerUser(null);
      }).toThrow();
    });
  });

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

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = (customerId) => {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// describe("notifyCustomer", () => {
//   it("should send an email to the customer", () => {
//     db.notifyCustomer = () => {
//       return { email: "a" };
//     };

//     let mailSent = false;
//     mail.send = (email, message) => {
//       mailSent = true;
//     };

//     lib.notifyCustomer({ customerId: 1 });

//     expect(mailSent).toBe(true);
//   });
// });

// Better way to use mock functions:
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // mockFunction docs: https://jestjs.io/docs/mock-function-api
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1); // return a 1 value
    // mockFunction.mockResolvedValue(1); // return a promise when we await that we got 1
    // mockFunction.mockRejectedValue(new Error("...")); // return a rejected promise and when we await it that we got the error

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    // check if this fn called
    expect(mail.send).toHaveBeenCalled();

    // you can check if method called with parameters:
    //expect(mail.send).toHaveBeenCalledWith("a", "..."); // we should not check the exact quality so instead we can do this:
    // callls[0][0] first call, first parameter
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
