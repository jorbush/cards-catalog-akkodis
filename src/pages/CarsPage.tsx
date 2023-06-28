import React, { useEffect, useState } from 'react';
import carsData from '../data/cars.json';
import NavigationHeader from '../components/NavigationHeader';
import CardComponent from '../components/CardComponent';
import ToasterProvider from '../providers/ToasterProvider';
import AddButton from '../components/AddButton';
import CarForm from '../components/CarForm';
import usersData from '../data/users.json';
import Car from '../../types/Car';

const CarsPage = () => {
  const [users, setUsers] = useState(usersData.usuarios);
  const [cars, setCars] = useState(carsData.coches)
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUsers = localStorage.getItem('users')
    const cachedCars = localStorage.getItem('cars')
    //console.log(cachedCars, cachedUsers)
    if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers))
    } 
    if (cachedCars){
        setCars(JSON.parse(cachedCars))
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('cars', JSON.stringify(cars));
      //console.log("Saving on cache")
    }
  }, [users, cars]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addCar = (newCar: Car) => {
    const updatedCars = [...cars, newCar];
    console.log(updatedCars)
    setCars(updatedCars);
  };
    return (
      <div className="
            max-w-[2520px]
            mx-auto
            xl:px-20
            md:px-10
            sm:px-7
            px-4
      ">
        <ToasterProvider/>
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
          ">
            {cars.map((car) => (
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
        <AddButton onClick={toggleForm}/>
          {showForm && 
              <CarForm
                  users={users} 
                  cars={cars}
                  onToggleForm={toggleForm} 
                  onAddCar={addCar} 
                  onUpdateUser={()=>{}}
              />
          }
      </div>
    );
  };
  
  export default CarsPage;
  