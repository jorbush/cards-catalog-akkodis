import React from 'react';
import carsData from '../data/cars.json';
import NavigationHeader from '../components/NavigationHeader';

const CarsPage = () => {
    return (
      <div className="
            max-w-[2520px]
            mx-auto
            xl:px-20
            md:px-10
            sm:px-7
            px-4
        ">
            <NavigationHeader
                activePage='Cars'
                primaryText='Users'
                secondaryText='Cars'
            />
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
  