"use client";

import { getProviders, signIn } from "next-auth/react";
import Header from "@/components/Header";

export default async function Page() {
    const providers = await getProviders();

    if (!providers) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="flex justify-center space-x-7 mt-20">
                <img
                    src="https://p16-capcut-va.ibyteimg.com/tos-maliva-i-6rr7idwo9f-us/4234875e83f14b06bec973028d770313~tplv-6rr7idwo9f-image.image"
                    alt="instagram-image"
                    className="hidden md:inline-flex object-cover rotate-6 md:w-[40%]"
                />
                <div className="">
                    {Object.values(providers).map((provider) => (
                        <div
                            key={provider.id}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="https://support.pingidentity.com/servlet/servlet.FileDownload?file=00P1W00001JyxeKUAR"
                                alt="instagram-logo"
                                className="w-32 object-cover"
                            />
                            <p className="text-sm italic my-10 text-center">
                                This app is created for learning purpose
                            </p>
                            <button
                                className="p-3 rounded-lg bg-red-400 text-white"
                                onClick={() =>
                                    signIn(provider.id, { callbackUrl: "/" })
                                }
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
