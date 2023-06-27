import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import User from '../../types/User';


interface UserFormProps {
    users: User[];
    onToggleForm: () => void;
    onAddUser: (newUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ 
    users, 
    onToggleForm, 
    onAddUser 
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [favoriteCars, setFavoriteCars] = useState<number[]>([]);      
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            coches_favoritos: favoriteCars,
        };
        onAddUser(newUser);
        clearInputs()
    };

    const clearInputs = () => {
        setName('');
        setEmail('');
        setFavoriteCars([]);
    }
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="favoriteCars">Favorite cars:</label>
                    <input
                        type="text"
                        id="favoriteCars"
                        value={favoriteCars.join(',')}
                        onChange={(e) =>
                            setFavoriteCars(
                              e.target.value.split(',').map((car) => parseInt(car.trim(), 10))
                            )
                        }
                    />
                </div>
                <button type="submit" onClick={onToggleForm}>Add User</button>
            </form>
        </div>
    );
  };
  
  export default UserForm;
  