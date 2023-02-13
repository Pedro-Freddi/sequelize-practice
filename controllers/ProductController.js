const { Product, Sequelize } = require("../models/index.js");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.json({ products });
    } catch (error) {
      next(error);
    }
  }

  static async getByName(req, res, next) {
    try {
      const { name } = req.params;
      const product = await Product.findOne({
        where: {
          name: {
            [Sequelize.Op.like]: name,
          },
        },
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: "Can't find a product with that name." });
      }
      return res.json({ product });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, displayName, sku, price, description } = req.body;
      const product = await Product.create({
        name,
        displayName,
        sku,
        price,
        description
      });
      return res.status(201).json({ product });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Can't find a product with that ID." });
      }
      const { name, displayName, sku, price, description } = req.body;
      const updatedProduct = await product.update({
        name,
        displayName,
        sku,
        price,
        description
      });
      return res.status(200).json({ product: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Can't find a product with that ID." });
      }
      await product.destroy();
      return res.json({ message: "Product deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
