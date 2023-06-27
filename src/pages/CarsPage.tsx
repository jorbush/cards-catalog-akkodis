import React from 'react';
import carsData from '../data/cars.json';

const CarsPage = () => {
    return (
      <div>
        <h1>Cars</h1>
        <ul>
          {carsData.coches.map((cars) => (
            <li key={cars.id}>
              {cars.nombre} - {cars.marca}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CarsPage;
  