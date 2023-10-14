'use client'

import MenuItem from "@/components/navbar/navbarMenus/MenuItem";
import {useRouter} from "next/navigation";

interface SideBarProps {
    selected?: string | ""
}

const SideBar = ({selected} : SideBarProps) => {
    const router = useRouter();
    return(
        <div className="p-4">
            <div className="text-xl font-semibold mb-4">Account</div>
            <div className={`ml-6 text-lg mb-2 cursor-pointer ${selected == 'editProfile' ? 'text-green-700' : ''}`}
                 onClick={() => {router.push('/editProfile')}}>Profile Info</div>
            <div className={`ml-6 text-lg mb-2 cursor-pointer ${selected == 'editContact' ? 'text-green-700' : ''}`}
                 onClick={() => {router.push('/editContact')}}>Contact Info</div>
            <div className={`ml-6 text-lg mb-2 cursor-pointer ${selected == 'changePassword' ? 'text-green-700' : ''}`}
                 onClick={() => {router.push('/changePassword')}}>Password</div>
        </div>
    );
}

export default SideBar;