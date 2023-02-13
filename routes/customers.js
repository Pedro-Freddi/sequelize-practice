const CustomerController = require("../controllers/CustomerController.js");
const router = require("express").Router();

router.get("/", CustomerController.getAll);
router.post("/", CustomerController.create);
router.get("/:id", CustomerController.getById);
router.put("/:id", CustomerController.update);
router.delete("/:id", CustomerController.delete);

module.exports = router;