import Image from "next/image";
import React from "react";

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
                <h1>Right sides</h1>
            </div>
            {/* Middle */}
            {/* Right */}
        </div>
    );
}
