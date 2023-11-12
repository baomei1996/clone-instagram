import React, { useState } from "react";
import {
    HiDotsHorizontal,
    HiOutlineChat,
    HiOutlineBookmark,
    HiOutlineHeart,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

type PostProps = {
    id: string;
    username: string;
    userImg: string;
    img: string;
    caption: string;
};

export default function Post({
    id,
    img,
    userImg,
    username,
    caption,
}: PostProps) {
    const { data: session } = useSession();
    const [comment, setComment] = useState<string>("");

    const sentComment = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const commentToSend = comment;
            setComment("");
            await addDoc(collection(db, "posts", id, "comments"), {
                comment: commentToSend,
                username: session?.user?.username,
                userImage: session?.user?.image,
                timestamp: serverTimestamp(),
            });
        } catch (err) {
            console.error(err);
        }
    };

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
            {/* Post Buttons */}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        <HiOutlineHeart className="btn" />
                        <HiOutlineChat className="btn" />
                    </div>
                    <HiOutlineBookmark className="btn" />
                </div>
            )}
            {/* Post Comments */}
            <p className="p-5 truncate">
                <span className="font-bold mr-2">{username}</span>
                {caption}
            </p>
            {/* Post Input Box */}
            {session && (
                <form className="flex items-center p-4" onSubmit={sentComment}>
                    <HiOutlineEmojiHappy className="text-2xl" />
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border-none flex-1 focus:ring-0"
                        type="text"
                        placeholder="Enter your comment..."
                    />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="text-blue-400 font-bold disabled:text-blue-200"
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    );
}
