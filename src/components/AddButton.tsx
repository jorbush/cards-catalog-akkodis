import React from "react";

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ 
    onClick
}) => {
    return(
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
            onClick={onClick}
        >
            {'+'}
        </button>
    )
}
export default AddButton