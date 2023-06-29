import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import User from '../../types/User';
import Car from '../../types/Car';
import Dialog from './Dialog';
import { toast } from "react-hot-toast";
import Input from './Input';

interface CarFormProps {
    cars: Car[];
    onToggleForm: () => void;
    onAddCar: (newCar: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ 
    cars,
    onToggleForm, 
    onAddCar,
}) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [brand, setBrand] = useState('');
    const [brandError, setBrandError] = useState(false);

    const nameRegex = /^.{0,10}$/;
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidForm()){
            return 
        }
        const newId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 0
        const newCar: Car = {
            id: newId,
            nombre: name,
            marca: brand
        };
        onAddCar(newCar);
        onToggleForm();
        toast.success('Car added');
        clearInputs();
    };

    const clearInputs = () => {
        setName('');
        setBrand('');
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
      
        if (brand === "") {
            toast.error("Brand cannot be empty");
            setBrandError(true);
            isValid = false;
        } else if (!nameRegex.test(brand)) {
            toast.error("Brand must be up to 10 characters");
            setBrandError(true);
            isValid = false;
        } else {
            setBrandError(false);
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
                                setBrand(e.target.value)
                                setBrandError(false)
                            }}
                            value={brand}
                            label="Brand"
                            hasError={brandError}
                        />
                       
                        <button
                            type="submit"
                            className="
                                bg-blue-500 
                                hover:bg-blue-700 
                                text-white 
                                font-bold 
                                py-2 
                                px-4 
                                rounded 
                                focus:outline-none 
                                focus:shadow-outline 
                                w-full
                            ">
                                Add Car
                        </button>
                    </div>
                </form>
            )} 
            onToggleForm={onToggleForm}
        />
    );
};

export default CarForm;
