'use client'

import {SafeUser} from "@/types";
import Container from "@/components/Container";
import ToasterProvider from "@/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ShopByDepartment from "@/components/lists/ShopByDepartment";

interface ProfileSettingsLayoutProps {
    currentUser?: SafeUser | null,
    children: React.ReactNode
}

// export default async function ProfileLayout({
//                                              children,
//                                          }: {
//     children: React.ReactNode
// }) {
//     const currentUser = await getCurrentUser();
//     return(
//
//         <html lang="en">
//             <body>
//                 <Navbar currentUser={currentUser}></Navbar>
//                 <div>
//                     {children}
//                 </div>
//             </body>
//         </html>
//     )
// }

export default function ProfileSettingsLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {

    return(
        <Container>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-lg text-gray-500">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
        </Container>
    )

}



