import React from 'react';
import usersData from '../data/users.json';

const HomePage = () => {
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {usersData.usuarios.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};
  
export default HomePage;
  