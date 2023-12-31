import express from "express";
import morgan from "morgan";

import controlsRoutes from "./routes/controls.routes.js";
import sellersRoutes from "./routes/sellers.routes.js";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", sellersRoutes);
app.use("/api", controlsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
