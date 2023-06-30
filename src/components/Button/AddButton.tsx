import React from "react";

interface AddButtonProps {
    onClick: () => void;
    content?: React.ReactElement;
}

const AddButton: React.FC<AddButtonProps> = ({ 
    onClick,
    content,
}) => {
    return(
        <div
            className="
                fixed 
                bottom-8 
                right-8 
                p-3
                rounded-full 
                bg-blue-500 
                text-white
                justify-center
                cursor-pointer
                "
            onClick={onClick}
        >
            {content}
        </div>
    )
}
export default AddButton