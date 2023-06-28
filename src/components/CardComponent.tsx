import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiFillDelete, AiOutlineDelete } from "react-icons/ai";


interface CardComponentProps{
    image?: string;
    content?: React.ReactElement;
    likeButtonEnabled?: boolean;
    liked?: boolean;
    onLiked?: () => void;
    deleteButtonEnabled?: boolean;
    onDeleted?: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ 
    image = "/images/placeholder.jpg",
    content, 
    likeButtonEnabled,
    liked = false,
    onLiked = () => {},
    deleteButtonEnabled = false,
    onDeleted = () => {},
}) => {

    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeClick = () =>{
        setIsLiked(!isLiked)
        onLiked()
    }

    return (
        <div className="
            flex 
            flex-row 
            items-center
            w-[300px]
            mb-8
        ">
            <div className="
                aspect-square 
                w-[100px]
                relative 
                overflow-hidden 
                rounded-xl
            ">
                <img
                    className="
                        object-cover 
                        h-full 
                        w-full 
                    "
                    src={image}
                    alt="Image"
                />
                {likeButtonEnabled &&(
                    <div className="
                        absolute
                        bottom-3
                        left-3
                    ">
                        <div
                            onClick={handleLikeClick}
                            className="
                                relative
                                hover:opacity-80
                                transition
                                cursor-pointer
                            "
                            >
                            <AiOutlineHeart
                                size={28}
                                className="
                                fill-white
                                absolute
                                -top-[2px]
                                -right-[2px]
                                "
                            />
                            <AiFillHeart
                                size={24}
                                className={isLiked ? "fill-rose-500" : "fill-neutral-500/70"}
                            />
                        </div>
                    </div>
                )}
                {deleteButtonEnabled &&(
                    <div className="
                        absolute
                        bottom-3
                        right-3
                    ">
                        <div
                            onClick={onDeleted}
                            className="
                                relative
                                hover:opacity-80
                                transition
                                cursor-pointer
                            "
                            >
                            <AiOutlineDelete
                                size={28}
                                className="
                                fill-white
                                absolute
                                -top-[2px]
                                -right-[2px]
                                "
                            />
                            <AiFillDelete
                                size={24}
                                className={"fill-red-500"}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="relative p-6 pt-0 pb-0 flex-auto">
                {content}
            </div>
        </div>
    )

}

export default CardComponent