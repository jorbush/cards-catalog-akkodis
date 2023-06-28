import React, { useState } from 'react';
import usersData from '../data/users.json';
import UserForm from '../components/UserForm';
import User from '../../types/User';
import CardComponent from '../components/CardComponent';


const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState(usersData.usuarios);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const addUser = (newUser: User) => {
        const updatedUsers = [...users, newUser];
        console.log(updatedUsers)
        setUsers(updatedUsers);
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
            <div className="flex justify-center">
                <div className="
                    text-2xl 
                    font-bold
                    pt-4
                    pb-4
                ">
                    Users
                </div>  
            </div>
            
            <div className="flex justify-center">
                <div className="
                    grid 
                    grid-cols-1
                    gap-4
                ">
                    {users.map((user: User) => (
                        <CardComponent key={user.id} content={
                            (
                                <div className="flex flex-col gap-2">
                                    <div>{user.name}</div>
                                    <div>{user.email}</div>
                                    <div className='flex flex-row'>
                                        {user.coches_favoritos.map((car) => (
                                            <div key={car}>{car}</div>
                                        ))}
                                    </div>
                                    
                                </div>
                            )
                        }/>
                    ))}
                </div>
            </div>
            
            <button
                className="
                    fixed 
                    bottom-4 
                    right-4 
                    pr-4
                    pl-4
                    pt-2.5 
                    pb-2.5
                    rounded-full 
                    bg-blue-500 
                    text-white"
                onClick={toggleForm}
            >
                {'+'}
            </button>
            {showForm && 
                <UserForm 
                    users={users} 
                    onToggleForm={toggleForm} 
                    onAddUser={addUser} 
                />
            }
        </div>
    );
};
  
export default HomePage;
  