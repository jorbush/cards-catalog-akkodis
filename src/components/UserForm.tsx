import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import User from '../../types/User';
import Dialog from './Dialog';
import { toast } from "react-hot-toast";
import Input from './Input';

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
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [favoriteCars, setFavoriteCars] = useState<number[]>([]);      
    const [favoriteCarsError, setFavoriteCarsError] = useState(false);

    const nameRegex = /^.{0,10}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidForm()){
            return 
        }
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            coches_favoritos: favoriteCars,
        };
        onAddUser(newUser);
        onToggleForm();
        toast.success('User added');
        clearInputs();
    };

    const clearInputs = () => {
        setName('');
        setEmail('');
        setFavoriteCars([]);
    }

    const isValidForm = () => {
        let isValid = true;
      
        if (name === "") {
            toast.error("Name cannot be empty");
            setNameError(true);
            isValid = false;
        } else if (!nameRegex.test(name)) {
            toast.error("Name must be up to 10 characters");
            setNameError(true);
            isValid = false;
        } else {
            setNameError(false);
        }
      
        if (email === "") {
            toast.error("Email cannot be empty");
            setEmailError(true);
            isValid = false;
        } else if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }
      
        if (favoriteCars.length === 0) {
            toast.error("Favorite cars cannot be empty");
            setFavoriteCarsError(true);
            isValid = false;
        } else {
            setFavoriteCarsError(false);
        }
      
        return isValid;
      };
      
  
    return (
        <Dialog
            content={(
                <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                    <div className="p-2">
                        <Input 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setName(e.target.value)
                                setNameError(false)
                            }}
                            value={name}
                            label="Name"
                            hasError={nameError}
                        />
                        <Input 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value)
                                setEmailError(false)
                            }}
                            value={email}
                            label="Email"
                            hasError={emailError}
                        />
                        <div className="mb-6">
                            <label htmlFor="favoriteCars" className="block text-gray-700 font-bold mb-2">
                                Favorite cars
                            </label>
                            <input
                                type="text"
                                id="favoriteCars"
                                value={favoriteCars.join(',')}
                                onChange={(e) =>
                                    setFavoriteCars(
                                        e.target.value.split(',').map((car) => parseInt(car.trim(), 10))
                                    )
                                }
                                className="
                                    appearance-none 
                                    border 
                                    rounded 
                                    w-full 
                                    py-2 
                                    px-3 
                                    text-gray-700 
                                    leading-tight 
                                    focus:outline-none 
                                    focus:border-blue-500
                                "
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            )} 
            onToggleForm={onToggleForm}
        />
    );
};

export default UserForm;
