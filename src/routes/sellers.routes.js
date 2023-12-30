import { Router } from "express";
import {
  createSeller,
  deleteSeller,
  getSeller,
  getSellers,
  getLoginSeller,
  updateSeller,
} from "../controllers/sellers.controller.js";

const router = Router();

// GET all Employees
router.get("/sellers", getSellers);

router.get("/sellers/login", getLoginSeller);

// GET An Employee
router.get("/sellers/:id", getSeller);

// DELETE An Employee
router.delete("/sellers/:id", deleteSeller);

// INSERT An Employee
router.post("/sellers", createSeller);

router.patch("/sellers/:id", updateSeller);

export default router;
