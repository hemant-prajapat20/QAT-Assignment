import express from "express";
import {
  getAllUsers,
  getUsersByRole,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", protect, authorize("admin"), getAllUsers);
router.get("/members", protect, authorize("manager", "admin"), getUsersByRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);

export default router;
