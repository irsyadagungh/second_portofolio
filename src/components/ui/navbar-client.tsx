"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function NavbarClient({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}
            <main className="block">{children}</main>
            {!isAdminPage && <Footer />}
        </>
    );
}
