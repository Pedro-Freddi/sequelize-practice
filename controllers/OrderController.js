const { Order, ShippingAddress, sequelize } = require("../models/index.js");

class OrderController {
  static async getAll(req, res, next) {
    try {
      const orders = await Order.findAll();
      return res.json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
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
        return res
          .status(201)
          .json({
            order: {
              ...order.dataValues,
              shippingAddress: { ...shippingAddress.dataValues },
            },
          });
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
        const updatedOrder = await order.update({
          total,
          status,
        });
        const updatedAddress = await shippingAddress.update({
          address,
          city,
          country,
          postalCode,
        });
        await t.commit();
        return res.json({
          order: {
            ...updatedOrder.dataValues,
            shippingAddress: { ...updatedAddress.dataValues },
          },
        });
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
