"use client";

import { Session } from "next-auth";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="false" id="root">
                <SessionProvider session={session}>
                    <RecoilRoot>{children}</RecoilRoot>
                </SessionProvider>
            </body>
        </html>
    );
}
