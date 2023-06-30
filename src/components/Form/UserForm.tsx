import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import User from '../../../types/User';
import Car from '../../../types/Car';
import Dialog from './Dialog';
import { toast } from "react-hot-toast";
import Input from '../Input';

interface UserFormProps {
    users: User[];
    cars: Car[];
    onToggleForm: () => void;
    onAddUser: (newUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ 
    users, 
    cars,
    onToggleForm, 
    onAddUser 
}) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [favoriteCars, setFavoriteCars] = useState<string[]>([]); 
    const [favoriteCarIds, setFavoriteCarIds] = useState<number[]>([]);      
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
            coches_favoritos: favoriteCarIds,
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
        } else if (favoriteCars.length > 3){
            toast.error("The maximum number of cars is 3.");
            setFavoriteCarsError(true);
            isValid = false;
        } else if (favoriteCars.length !== favoriteCarIds.length){
            toast.error("There is a car that is not available");
            setFavoriteCarsError(true);
            isValid = false;
        }  else {
            setFavoriteCarsError(false);
        }
      
        return isValid;
    };

    const addFavoriteCar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const carNames = e.target.value.split(',');
        const carIds: number[] = [];
        setFavoriteCars(carNames)
        if (carNames.length > 3){
            toast.error("The maximum number of cars is 3.");
            setFavoriteCarsError(true);
        } else {
            for (const carName of carNames) {
                if (carName.trim() !== ""){
                const foundCar = cars.find((car) => car.nombre.trim().toLowerCase() === carName.trim().toLowerCase());
                    if (foundCar) {
                        carIds.push(foundCar.id);
                        setFavoriteCarsError(false)
                    } else {
                        //toast.error(`Car "${carName}" not found`);
                        setFavoriteCarsError(true)
                        break
                    } 
                }
            }
        }
        setFavoriteCarIds(carIds);
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
                            placeholder="User name"
                            hasError={nameError}
                        />
                        <Input 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value)
                                setEmailError(false)
                            }}
                            value={email}
                            placeholder='User email'
                            label="Email"
                            hasError={emailError}
                        />
                        <Input 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                addFavoriteCar(e)
                            }}
                            value={favoriteCars.join(',')}
                            label="Favorite cars"
                            placeholder='e.g. Formentor, Ateca, ...'
                            hasError={favoriteCarsError}
                        />
                       
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
