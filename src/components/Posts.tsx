import React from "react";
import Post from "./Post";

export default function Posts() {
    const posts = [
        {
            id: "1",
            username: "natasha",
            userImg:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
            img: "https://images.unsplash.com/photo-1695097737988-26ef6731d56d?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            caption: "thanks for watching",
        },
        {
            id: "2",
            username: "david",
            userImg:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
            img: "https://images.unsplash.com/photo-1695349092661-6e53e5182140?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
            caption: "Nice picture",
        },
        {
            id: "3",
            username: "natasha",
            userImg:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
            img: "https://images.unsplash.com/photo-1697194097089-c78003fc69a3?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
            caption: "Night street",
        },
    ];
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}
