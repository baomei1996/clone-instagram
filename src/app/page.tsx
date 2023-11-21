import Header from "@/components/Header";
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "clone-instagram",
    description: "Instagram clone built with Next.js and Tailwind CSS",
    icons: {
        icon: "/instagram_icon.png",
    },
};

export default function Page() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <Header />
            {/* Feed */}
            <Feed />
            {/* Modal */}
            <UploadModal />
        </div>
    );
}
