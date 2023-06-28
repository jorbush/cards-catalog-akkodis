import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import User from '../../types/User';
import { IoMdClose } from "react-icons/io";



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
        onToggleForm();
        clearInputs();
    };

    const clearInputs = () => {
        setName('');
        setEmail('');
        setFavoriteCars([]);
    }
  
    return (
        <div className="
            justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            bg-neutral-800/70
        ">
        <div className="
            relative 
            w-full
            sm:w-5/6
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto 
            h-auto 
            bg-white
            rounded-xl
            p-6
          "
        >
            <div className='
                flex
                flex-row
            '>
                <IoMdClose size={18} onClick={onToggleForm}/>

            </div>
            <form onSubmit={handleSubmit}>
                <div className='
                    flex
                    flex-col
                    items-center
                    pt-6
                    gap-5
                '>
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
                    <button type="submit">Add User</button>
                </div>
                
            </form>
        </div>
        </div>

    );
  };
  
  export default UserForm;
  