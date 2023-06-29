import React from "react";
import { LuDatabaseBackup } from "react-icons/lu";

interface BackupButtonProps {
    onClick: () => void;
}

const BackupButton: React.FC<BackupButtonProps> = ({ 
    onClick
}) => {
    return(
        <div
            onClick={onClick}
            className="
                flex
                flex-row
                bg-green-500 
                hover:bg-green-700 
                text-white 
                font-bold 
                p-4
                px-7
                rounded 
                focus:outline-none 
                focus:shadow-outline 
                gap-4
                justify-center
                mt-10
                cursor-pointer
            ">
                <LuDatabaseBackup
                    size={24}
                />
                Backup
        </div>
    )
}
export default BackupButton