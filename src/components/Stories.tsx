"use client";

import React, { useEffect, useState } from "react";
import "minifaker/locales/en";
import miniFaker from "minifaker";
import Story from "./Story";

export default function Stories() {
    const [storyUsers, setStoryUsers] = useState<User[]>([]);

    useEffect(() => {
        const users = miniFaker.array(20, (i: number) => ({
            id: i,
            username: miniFaker.username({ locale: "en" }).toLowerCase(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(
                Math.random() * 70
            )}`,
        }));
        setStoryUsers(users);
    }, []);
    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
            {storyUsers.map((user) => (
                <Story key={user.id} username={user.username} img={user.img} />
            ))}
        </div>
    );
}
