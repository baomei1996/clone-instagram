import Header from "@/components/Header";
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";

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
