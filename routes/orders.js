const OrderController = require("../controllers/OrderController.js");
const router = require("express").Router();

router.get("/", OrderController.getAll);
router.post("/", OrderController.create);
router.get("/:id", OrderController.getById);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

module.exports = router;