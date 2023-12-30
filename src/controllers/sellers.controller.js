import { pool } from "../db.js";

export const getSellers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM sellers");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getSeller = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.query("SELECT * FROM sellers WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "sellers not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getLoginSeller = async (req, res) => {
  try {
    const { imei } = req.query;
    const [rows] = await pool.query("SELECT * FROM sellers WHERE imei = ?", [
      imei,
    ]);
    console.log (req);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "sellers not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const deleteSeller = async (req, res) => {
  try {
    const { id } = req.query;
    const [rows] = await pool.query("DELETE FROM sellers WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createSeller = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO sellers (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.status(201).json({ id: rows.insertId, name, salary });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
