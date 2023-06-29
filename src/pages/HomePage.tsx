import React, { useEffect, useState } from 'react';
import usersData from '../data/users.json';
import carsData from '../data/cars.json';
import UserForm from '../components/UserForm';
import User from '../../types/User';
import CardComponent from '../components/CardComponent';
import NavigationHeader from '../components/NavigationHeader';
import ToasterProvider from '../providers/ToasterProvider';
import AddButton from '../components/AddButton';
import BackupButton from '../components/BackupButton';


const HomePage = () => {
    const [users, setUsers] = useState(usersData.usuarios);
    const [cars, setCars] = useState(carsData.coches)
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const cachedUsers = localStorage.getItem('users')
      const cachedCars = localStorage.getItem('cars')
      console.log(cachedCars, cachedUsers)
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

    const addUser = (newUser: User) => {
        const updatedUsers = [...users, newUser];
        //console.log(updatedUsers)
        setUsers(updatedUsers);
    };

    const restoreInitialData = () => {
        setUsers(usersData.usuarios)
        setCars(carsData.coches)
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
                activePage='Users'
                primaryText='Users'
                secondaryText='Cars'
            />
            
            <div className="flex justify-center">
                <div className="
                    grid 
                    grid-cols-1
                    pt-4
                ">
                    {users.map((user: User) => (
                        <CardComponent key={user.id} content={
                            (
                                <div className="flex flex-col gap-2">
                                    <div>{user.name}</div>
                                    <div>{user.email}</div>
                                    <div className='flex flex-row'>
                                    {user.coches_favoritos.join(", ")}
                                    </div>
                                </div>
                            )
                        }/>
                    ))}
                </div>
            </div>
            <AddButton onClick={toggleForm}/>
            {showForm && 
                <UserForm 
                    users={users} 
                    cars={cars}
                    onToggleForm={toggleForm} 
                    onAddUser={addUser} 
                />
            }
            <div className="flex justify-center">
                <BackupButton onClick={restoreInitialData}/>
            </div>
        </div>
    );
};
  
export default HomePage;
  