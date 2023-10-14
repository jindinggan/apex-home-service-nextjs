import './globals.css'
import type {Metadata} from 'next'
import {Nunito} from 'next/font/google'
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/components/footer/Footer";
import SellModal from "@/components/modals/SellModal";
import ServiceModal from "@/components/modals/ServiceModal";
import MessageModal from "@/components/modals/MessageModal";

const font = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Apex Home Service',
    description: 'Apex Home Service Application',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={font.className}>
                {/*<Modal isOpen />*/}
                <ToasterProvider/>
                <RegisterModal/>
                <LoginModal/>
                <SellModal/>
                <ServiceModal/>
                <MessageModal/>
                <Navbar currentUser={currentUser}/>
                {/*<SearchBarWithDropdown/>*/}
            <div className="pb-20 pt-28">
                {children}
            </div>
                <Footer/>
            </body>
        </html>
    )
}
