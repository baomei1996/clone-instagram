"use client";

import Image from "next/image";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlinePlusCircle, HiHome } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { modalState } from "@/atom/modalAtom";
import { useSetRecoilState } from "recoil";

export default function Header() {
    const { data: session } = useSession();
    const setOpen = useSetRecoilState(modalState);

    return (
        <div className="shadow-sm border-b  sticky top-0 bg-white z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
                {/* Left */}
                <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
                    <Image
                        src={
                            "https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                        }
                        layout="fill"
                        className="object-contain"
                        alt="logo"
                    />
                </div>
                <div className="cursor-pointer h-24 w-10 relative lg:hidden">
                    <Image
                        src={
                            "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                        }
                        layout="fill"
                        className="object-contain"
                        alt="logo"
                    />
                </div>
                {/* Middle */}
                <div className="relative">
                    <div className="absolute top-2 left-2">
                        <FiSearch className="text-xl text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
                    />
                </div>
                {/* Right */}
                <div className="flex space-x-4 items-center">
                    <HiHome className="text-2xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
                    {session ? (
                        <>
                            <HiOutlinePlusCircle
                                className="hidden md:inline-flex text-2xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                                onClick={() => setOpen(true)}
                            />
                            <img
                                onClick={() => signOut()}
                                src={session.user?.image ?? ""}
                                alt="user-image"
                                className="h-10 rounded-full cursor-pointer"
                            />
                        </>
                    ) : (
                        <button onClick={() => signIn()}>Sign in</button>
                    )}
                </div>
            </div>
        </div>
    );
}
