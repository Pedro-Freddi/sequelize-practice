const { Order, ShippingAddress, OrderItem, sequelize } = require("../models/index.js");

class OrderController {
  static async getAll(req, res, next) {
    try {
      const orders = await Order.findAll({ include: [ShippingAddress, OrderItem] });
      return res.json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, { include: [ShippingAddress, OrderItem] });
      if (!order) {
        return res
          .status(404)
          .json({ message: "Can't find an order with that ID." });
      }
      return res.json({ order });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { customerId, total, status, address, city, postalCode, country } =
        req.body;
      const t = await sequelize.transaction();
      try {
        const shippingAddress = await ShippingAddress.create({
          address,
          city,
          postalCode,
          country,
        });
        const order = await Order.create({
          customerId,
          shippingAddressId: shippingAddress.dataValues.id,
          total,
          status,
        });
        await t.commit();
        const newOrder = await Order.findByPk(order.dataValues.id, {
          include: [ShippingAddress, OrderItem],
        });
        return res.status(201).json({ newOrder });
      } catch (error) {
        await t.rollback();
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Can't find an order with that ID." });
      }
      const shippingAddress = await ShippingAddress.findByPk(
        order.dataValues.shippingAddressId
      );
      const { total, status, address, city, postalCode, country } = req.body;
      const t = await sequelize.transaction();
      try {
        await order.update({
          total,
          status,
        });
        await shippingAddress.update({
          address,
          city,
          country,
          postalCode,
        });
        await t.commit();
        const updatedOrder = await Order.findByPk(order.dataValues.id, {
          include: [ShippingAddress, OrderItem],
        });
        return res.json({ updatedOrder });
      } catch (error) {
        await t.rollback();
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Can't find an order with that ID." });
      }
      await order.destroy();
      return res.json({ message: "Order deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
