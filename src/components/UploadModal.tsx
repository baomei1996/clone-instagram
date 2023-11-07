"use client";

import React from "react";
import { modalState } from "@/atom/modalAtom";
import { useRecoilValue } from "recoil";

export default function UploadModal() {
    const isOpen = useRecoilValue(modalState);
    return (
        <div>
            Upload Modal
            {isOpen && <h1>modal is open</h1>}
        </div>
    );
}
