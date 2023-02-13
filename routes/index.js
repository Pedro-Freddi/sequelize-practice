const customerRouter = require("./customers.js");
const productsRouter = require("./products.js");
const ordersRouter = require("./orders.js");
const apiRouter = require("express").Router();

apiRouter.use("/customers", customerRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);

module.exports = apiRouter;