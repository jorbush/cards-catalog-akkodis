import React, { useState } from 'react';
import usersData from '../data/users.json';
import UserForm from '../components/UserForm';
import User from '../../types/User';


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
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
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
  