import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/brands', async (req, res) => {
  const brands = await prisma.brand.findMany({ include: { cars: true } });
  res.json(brands);
});

app.post('/api/brands', async (req, res) => {
  const { name, country } = req.body;
  const brand = await prisma.brand.create({ data: { name, country } });
  res.status(201).json(brand);
});

app.get('/api/cars', async (req, res) => {
  const cars = await prisma.car.findMany({ include: { brand: true } });
  res.json(cars);
});

app.post('/api/cars', async (req, res) => {
  const { brandId, model, year, price, description } = req.body;
  const car = await prisma.car.create({
    data: { brandId, model, year, price, description },
  });
  res.status(201).json(car);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
