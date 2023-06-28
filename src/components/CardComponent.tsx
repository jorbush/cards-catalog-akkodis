import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface CardComponentProps{
    image?: string;
    content?: React.ReactElement;
    likeButtonEnabled?: boolean;
    liked?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ 
    image = "/images/placeholder.jpg",
    content, 
    likeButtonEnabled,
    liked = false
}) => {

    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeClick = () =>{
        setIsLiked(!isLiked)
    }

    return (
        <div className="
            flex 
            flex-row 
            items-center
            w-[300px]">
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
                        top-3
                        right-3
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
            </div>
            <div className="relative p-6 flex-auto">
                {content}
            </div>
        </div>
    )

}

export default CardComponent