"use client";

import React, { useEffect, useState } from "react";
import "minifaker/locales/en";
import miniFaker from "minifaker";
import Story from "./Story";
import { useSession } from "next-auth/react";

export default function Stories() {
    const { data: session } = useSession();
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
            {session && (
                <Story
                    username={session.user.username ?? ""}
                    img={session.user.image ?? ""}
                    isUser={true}
                />
            )}
            {storyUsers.map((user) => (
                <Story key={user.id} username={user.username} img={user.img} />
            ))}
        </div>
    );
}
