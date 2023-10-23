import React from "react";

type PostProps = {
    username: string;
    userImg: string;
    img: string;
    caption: string;
};

export default function Post({ img, userImg, username, caption }: PostProps) {
    return (
        <div>
            <h1>{username}</h1>
        </div>
    );
}
