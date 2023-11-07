import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

type StoryProps = {
    username: string;
    img: string;
    isUser?: boolean;
};

export default function Story({ username, img, isUser = false }: StoryProps) {
    return (
        <div className="relative group cursor-pointer">
            <img
                src={img}
                alt={username}
                className="h-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer group-hover:scale-110 transition-transform duration-200"
            />
            {isUser && (
                <HiOutlinePlus className="text-lg absolute top-4 left-4 text-white" />
            )}
            <p className="text-xs w-14 truncate">{username}</p>
        </div>
    );
}
