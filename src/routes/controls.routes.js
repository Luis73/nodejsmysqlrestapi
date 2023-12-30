import { Router } from "express";
import {
  createControl,
  deleteControl,
  getControl,
  getControls,
  updateControl,
} from "../controllers/controls.controller.js";

const router = Router();

// GET all Employees
router.get("/controls/all", getControls);

router.get("/controls", getControl);

// GET An Employee
router.get("/controls/:id", getControl);

// DELETE An Employee
router.delete("/controls/:id", deleteControl);

// INSERT An Employee
router.post("/controls", createControl);

router.patch("/controls/:id", updateControl);

export default router;
