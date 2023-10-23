import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";

export default function Feed() {
    return (
        <main>
            <section>
                {/* Stories */}
                <Stories />
                {/* Posts */}
                <Posts />
            </section>
            <section>
                {/* Mini profile */}
                {/* Suggestion */}
            </section>
        </main>
    );
}
