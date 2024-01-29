import express from "express";
import {
  GetUsers,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/Users.js";
import { verifyUser, SuperAdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, SuperAdminOnly, GetUsers);
router.get("/users/:id", verifyUser, SuperAdminOnly, GetUserById);
router.post("/users", verifyUser, SuperAdminOnly, CreateUser);
router.patch("/users/:id", verifyUser, SuperAdminOnly, UpdateUser);
router.delete("/users/:id", verifyUser, SuperAdminOnly, DeleteUser);

export default router;
