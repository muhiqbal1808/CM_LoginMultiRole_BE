import express from "express";
import {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/products", verifyUser, GetProducts);
router.get("/products/:id", verifyUser, GetProductById);
router.post("/products", verifyUser, CreateProduct);
router.patch("/products/:id", verifyUser, UpdateProduct);
router.delete("/products/:id", verifyUser, DeleteProduct);

export default router;
