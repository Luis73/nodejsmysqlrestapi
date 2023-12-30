import { pool } from "../db.js";

export const getControls = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM controls");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getControl = async (req, res) => {
  try {
    const { tabla } = req.query;
    
    const [rows] = await pool.query("SELECT  ifnull(max( id ), 0) FROM controls WHERE tabla = ?", [
      tabla,
    ]);

    console.log ( 'rows ' + rows ) ;
    
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Controls not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteControl = async (req, res) => {
  try {
    const { id } = req.query;
    const [rows] = await pool.query("DELETE FROM controls WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Controls not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createControl = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO controls (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.status(201).json({ id: rows.insertId, name, salary });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateControl = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE controls SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Controls not found" });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
