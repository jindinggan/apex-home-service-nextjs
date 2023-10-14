
import {SafeUser} from "@/types";
import Container from "@/components/Container";
import ToasterProvider from "@/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ShopByDepartment from "@/components/lists/ShopByDepartment";
import UserBanner from "@/app/(profile)/components/UserBanner";
import SideBar from "@/app/(profile)/components/SideBar";

interface ProfileSettingsLayoutProps {
    children?: React.ReactNode
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

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}){
 {
    const currentUser = await getCurrentUser();
    return(
        <Container>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <UserBanner currentUser={currentUser}/>
                <div className="flex-1 lg:max-w-2xl">{children}</div>

            </div>
        </Container>
    )

 }
}



