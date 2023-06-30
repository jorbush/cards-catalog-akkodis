import React, { useEffect, useState } from 'react';
import usersData from '../data/users.json';
import carsData from '../data/cars.json';
import UserForm from '../components/Form/UserForm';
import User from '../../types/User';
import CardComponent from '../components/CardComponent';
import NavigationHeader from '../components/NavigationHeader';
import ToasterProvider from '../providers/ToasterProvider';
import AddButton from '../components/Button/AddButton';
import BackupButton from '../components/Button/BackupButton';
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-hot-toast";

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

    const handleDeleteUser = (id: number) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
    
        toast.success('User deleted!')
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
                        <CardComponent 
                            key={user.id} 
                            content={
                                (
                                    <div className="flex flex-col gap-2">
                                        <div className="font-semibold">{user.name}</div>
                                        <div>{user.email}</div>
                                        <div className='flex flex-row text-gray-500'>
                                            {user.coches_favoritos.map((carId) =>
                                                cars.find((car) => car.id === carId)?.nombre
                                            ).join(", ")}
                                        </div>
                                    </div>
                                )
                            }
                            deleteButtonEnabled
                            onDeleted={() => handleDeleteUser(user.id)}
                            />
                    ))}
                </div>
            </div>
            <AddButton 
                onClick={toggleForm}
                content={(<AiOutlineUserAdd size={24}/>)}
            />
            {showForm && 
                <UserForm 
                    users={users} 
                    cars={cars}
                    onToggleForm={toggleForm} 
                    onAddUser={addUser} 
                />
            }
            <div className="flex justify-center my-10">
                <BackupButton onClick={restoreInitialData}/>
            </div>
        </div>
    );
};
  
export default HomePage;
  