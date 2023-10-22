import Header from "@/components/Header";
import Feed from "@/components/Feed";
export default function Page() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <Header />
            <Feed />
        </div>
    );
}
