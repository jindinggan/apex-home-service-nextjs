'use client'
import {SafeUser} from "@/types";
import Avatar from "@/components/Avatar";

interface UserBannerProps {
    currentUser?: SafeUser | null,
}
const UserBanner: React.FC<UserBannerProps> = ({
    currentUser
                                               }) => {

    return(
        <div className="flex items-center">
            <div className="w-32 h-32 object-cover rounded-none">
                <div className="w-full h-full">
                    <Avatar src={currentUser?.image} height={"128"} width={"128"}/>
                </div>
            </div>
            <div className="ml-10 text-3xl">{currentUser?.name}</div>
        </div>
    );
}

export default UserBanner;