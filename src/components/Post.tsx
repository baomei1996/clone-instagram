import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

type PostProps = {
    username: string;
    userImg: string;
    img: string;
    caption: string;
};

export default function Post({ img, userImg, username, caption }: PostProps) {
    return (
        <div className="bg-white my-7 border rounded-md">
            {/* Post Header */}
            <div className="flex items-center p-5">
                <img
                    className="h-12 rounded-full object-cover border p-1 mr-3"
                    src={userImg}
                    alt={username}
                />
                <p className="font-bold flex-1">{username}</p>
                <HiDotsHorizontal />
            </div>
            {/* Post Image */}
            <img className="object-cover w-full" src={img} alt="" />
        </div>
    );
}
