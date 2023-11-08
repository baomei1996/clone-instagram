"use client";

import React, { useRef, useState } from "react";
import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import { HiOutlineCamera } from "react-icons/hi2";
import Modal from "react-modal";
import {
    addDoc,
    collection,
    serverTimestamp,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { set } from "firebase/database";

Modal.setAppElement("#root");

export default function UploadModal() {
    const { data: session } = useSession();
    const filePickerRef = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState<
        null | string | ArrayBuffer
    >(null);

    const onRequestClose = () => {
        setOpen(false);
        setSelectedFile(null);
    };

    const onClickCamera = () => {
        filePickerRef.current?.click();
    };

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent?.target?.result ?? null);
        };
    };

    const onClickSelectedFile = () => {
        setSelectedFile(null);
    };

    const uploadPost = async () => {
        if (loading) return;

        try {
            setLoading(true);

            // adding the post to firebase
            const docRef = await addDoc(collection(db, "posts"), {
                caption: captionRef.current?.value,
                username: session?.user?.username,
                profileImg: session?.user?.image,
                timestamp: serverTimestamp(),
            });

            // uploading the image to firebase storage
            const imageRef = ref(storage, `posts/${docRef.id}/image`);
            await uploadString(
                imageRef,
                selectedFile as string,
                "data_url"
            ).then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        } catch (err) {
            console.error(err);
        } finally {
            setOpen(false);
            setLoading(false);
            setSelectedFile(null);
        }
    };

    return (
        <>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
                    isOpen={open}
                    onRequestClose={onRequestClose}
                >
                    <div className="flex flex-col justify-center items-center h-[100%]">
                        {selectedFile ? (
                            <img
                                onClick={onClickSelectedFile}
                                src={selectedFile as string}
                                alt=""
                                className="w-full max-h-[250px] cursor-pointer object-contain"
                            />
                        ) : (
                            <HiOutlineCamera
                                className="cursor-pointer text-6xl bg-red-200 p-2 rounded-full border-2 text-red-500"
                                onClick={onClickCamera}
                            />
                        )}
                        <input
                            type="file"
                            hidden
                            ref={filePickerRef}
                            onChange={addImageToPost}
                        />
                        <input
                            type="text"
                            maxLength={150}
                            placeholder="Please enter your caption..."
                            className="m-5 border-none text-center w-full focus:ring-0"
                            ref={captionRef}
                        />
                        <button
                            disabled={!selectedFile || loading}
                            className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                            onClick={uploadPost}
                        >
                            Upload post.
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}
