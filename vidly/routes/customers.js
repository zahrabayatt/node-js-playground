const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).send("The customer with the given ID was not found!");
    return;
  }

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const customer = new Customer(req.body);
  customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!customer) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    res.status(404).send("The customer with the given ID was not found!");
    return;
  }

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = new Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

module.exports = router;
