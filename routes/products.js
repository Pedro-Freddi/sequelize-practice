const ProductController = require("../controllers/ProductController.js");
const router = require("express").Router();

router.get("/", ProductController.getAll);
router.post("/", ProductController.create);
router.get("/:name", ProductController.getByName);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;