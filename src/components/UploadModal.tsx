"use client";

import React, { useRef, useState } from "react";
import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import { HiOutlineCamera } from "react-icons/hi2";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function UploadModal() {
    const filePickerRef = useRef<HTMLInputElement>(null);
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

    return (
        <>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] min-h-[300px] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
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
                        />
                        <button
                            disabled
                            className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                        >
                            Upload post.
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}
