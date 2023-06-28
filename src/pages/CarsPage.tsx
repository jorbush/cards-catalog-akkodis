import React from 'react';
import carsData from '../data/cars.json';
import NavigationHeader from '../components/NavigationHeader';
import CardComponent from '../components/CardComponent';

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
            <div className="flex justify-center">
              <div className="
                grid 
                grid-cols-1
                pt-4
                gap-8
              ">
                {carsData.coches.map((car) => (
                  <CardComponent 
                    key={car.id} 
                    image="/images/ibiza.jpeg"
                    content={
                      (
                        <div className="flex flex-col gap-2">
                          <div className='text-xl font-semibold'>{car.nombre}</div>
                          <div>{car.marca}</div>
                        </div>
                      )
                    }
                  />
                ))}
              </div>
            </div>
      </div>
    );
  };
  
  export default CarsPage;
  