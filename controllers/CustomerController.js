const { Customer, Order } = require("../models/index.js");

class CustomerController {
  static async getAll(req, res, next) {
    try {
      const customers = await Customer.findAll({ include: Order });
      return res.json({ customers });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id, { include: Order });
      if (!customer) {
        return res
          .status(404)
          .json({ message: "Can't find a customer with that ID." });
      }
      return res.json({ customer });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { email, password, firstName, lastName, birthDate } = req.body;
      if (await Customer.findOne({ where: { email } })) {
        return res
          .status(400)
          .send({ message: "E-mail is already registered." });
      }
      const customer = await Customer.create({
        email,
        password,
        firstName,
        lastName,
        birthDate,
      });
      return res.status(201).json({ customer });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res
          .status(404)
          .json({ message: "Can't find a customer with that ID." });
      }
      const { email, password, firstName, lastName, birthDate } = req.body;
      if (
        email !== customer.dataValues.email &&
        (await Customer.findOne({ where: { email } }))
      ) {
        return res
          .status(400)
          .send({ message: "E-mail is already registered." });
      }
      const updatedCustomer = await customer.update({
        email,
        password,
        firstName,
        lastName,
        birthDate,
      });
      return res.status(200).json({ customer: updatedCustomer });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res
          .status(404)
          .json({ message: "Can't find a customer with that ID." });
      }
      await customer.destroy();
      return res
        .status(200)
        .json({ message: "Customer deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
