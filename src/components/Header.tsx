import Image from "next/image";
import React from "react";
import { FiSearch } from "react-icons/fi";

export default function Header() {
    return (
        <div>
            {/* Left */}
            <div className="flex items-center justify-between max-w-6xl">
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
                <h1>Right sides</h1>
            </div>
        </div>
    );
}
