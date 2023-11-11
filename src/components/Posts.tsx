import React, { useEffect, useState } from "react";
import Post from "./Post";
import {
    QuerySnapshot,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../firebase";

type Post = {
    id: string;
    username: string;
    profileImg: string;
    image: string;
    caption: string;
};

export default function Posts() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) => {
                const posts: Array<Post> = [];
                snapshot.docs.map((doc) => {
                    posts.push({
                        id: doc.id,
                        username: doc.data().username,
                        profileImg: doc.data().profileImg,
                        image: doc.data().image,
                        caption: doc.data().caption,
                    });
                });
                setPosts(posts);
            }
        );

        return unsubscribe;
    }, [db]);

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    userImg={post.profileImg}
                    img={post.image}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}
