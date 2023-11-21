import React, { useEffect, useState } from "react";
import {
    HiDotsHorizontal,
    HiOutlineChat,
    HiOutlineBookmark,
    HiOutlineHeart,
    HiHeart,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import {
    QuerySnapshot,
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";

type CommentData = {
    comment: string;
    username: string;
    userImage: string;
    timestamp: Timestamp;
};

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
    const [comments, setComments] = useState<
        QuerySnapshot<CommentData>["docs"]
    >([]);
    const [likes, setLikes] = useState<Array<string>>([]);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setComments(
                    snapshot.docs as QuerySnapshot<CommentData>["docs"]
                );
            }
        );

        return unsubscribe;
    }, [db, id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts", id, "likes")),
            (snapshot) => {
                setLikes(snapshot.docs.map((doc) => doc.id));
            }
        );

        return unsubscribe;
    }, [db, id]);

    useEffect(() => {
        setHasLiked(likes.includes(session?.user?.uid ?? ""));
    }, [likes]);

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

    const likePost = async () => {
        try {
            if (hasLiked) {
                await deleteDoc(
                    doc(db, `posts/${id}/likes`, session?.user.uid ?? "")
                );
            } else {
                await setDoc(
                    doc(db, `posts/${id}/likes`, session?.user.uid ?? ""),
                    {
                        username: session?.user?.username,
                    }
                );
            }
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
                        {hasLiked ? (
                            <HiHeart
                                onClick={likePost}
                                className="btn text-red-400"
                            />
                        ) : (
                            <HiOutlineHeart
                                onClick={likePost}
                                className="btn"
                            />
                        )}
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
            {comments.length > 0 && (
                <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                    {comments.map((comment, idx) => (
                        <div
                            key={`${id}_${idx}`}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <img
                                className="h-7 rounded-full object-cover"
                                src={comment.data().userImage}
                            />
                            <p className="font-semibold">
                                {comment.data().username}
                            </p>
                            <p className="flex-1 truncate">
                                {comment.data().comment}
                            </p>
                            <Moment fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
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
