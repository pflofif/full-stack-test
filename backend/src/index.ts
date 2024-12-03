import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@db:5432/autosalon',
});

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/brands', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM brands');
    res.json(result.rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

app.post('/api/brands', async (req, res) => {
  const { name, country } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO brands (name, country) VALUES ($1, $2) RETURNING *',
      [name, country]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

app.post('/api/cars', async (req, res) => {
  const { brand_id, model, year, price, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (brand_id, model, year, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [brand_id, model, year, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
