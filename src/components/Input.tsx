import React from "react";

interface InputProps {
    label?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)  => void;
}

const Input: React.FC<InputProps> = ({
    value,
    label,
    onChange
}) => {
    return(
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <input
                type="text"
                id="name"
                value={value}
                onChange={onChange}
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
    )
}
export default Input;