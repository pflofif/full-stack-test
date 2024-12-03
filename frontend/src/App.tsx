import React, { useState, useEffect } from 'react';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const App: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', country: '', model: '', year: '', price: '' });

  useEffect(() => {
    fetchBrands();
    fetchCars();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/cars`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: form.name, country: form.country }),
      });
      if (response.ok) {
        fetchBrands(); 
        setForm({ ...form, name: '', country: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Car Brands and Models</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Add a New Brand</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Brand Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Brand
          </button>
        </form>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Brands</h2>
        <ul className="list-disc pl-5">
          {brands.map((brand) => (
            <li key={brand.id}>
              <strong>{brand.name}</strong> ({brand.country || 'Unknown'})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Cars</h2>
        <ul className="list-disc pl-5">
          {cars.map((car) => (
            <li key={car.id}>
              <strong>{car.model}</strong> ({car.year}) - ${car.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
