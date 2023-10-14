'use client';

import Avatar from "@/components/Avatar";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import {User} from "@prisma/client";
import MenuItem from "@/components/navbar/navbarMenus/MenuItem";
import React, {useCallback, useState} from "react";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/types";
import { useRouter } from "next/navigation";
import useSellModal from "@/hooks/useSellModal";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const sellModal = useSellModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {/*<div*/}
                {/*    onClick={() => {*/}
                {/*    }}*/}
                {/*    className="*/}
                {/*    hidden*/}
                {/*    md:block*/}
                {/*    py-2*/}
                {/*    px-4*/}
                {/*    rounded-full*/}
                {/*    transition*/}
                {/*    cursor-pointer*/}
                {/*    hover:bg-neutral-100*/}
                {/*    active:bg-neutral-100*/}
                {/*    text-[16px]*/}
                {/*    font-semibold*/}
                {/*  "*/}
                {/*>*/}
                {/*    Become a Professional!*/}
                {/*</div>*/}

                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (

                        <>
                            <div
                                onClick={toggleMenu}
                                className="
                                p-4
                                md:py-1
                                md:px-2
                                border-[1px]
                                border-neutral-200
                                flex
                                flex-row
                                items-center
                                gap-3
                                rounded-full
                                cursor-pointer
                                hover:shadow-md
                                transition
                            "
                            >
                                <Avatar src={currentUser?.image} height={"30"} width={"30"}/>
                                {currentUser.email}
                            </div>
                            {isOpen && (
                                <div
                                    className="
                                        absolute
                                        rounded-xl
                                        shadow-md
                                        w-[40vw]
                                        md:w-3/4
                                        bg-white
                                        overflow-hidden
                                        right-0
                                        top-12
                                        text-sm
                                    "
                                >
                                    <div className="flex flex-col cursor-pointer">
                                        <MenuItem
                                            onClick={() => {router.push('/editProfile')}}
                                            label="Edit Profile and Settings"
                                        />
                                        <MenuItem
                                            onClick={() => {}}
                                            label="Your Messages"
                                        />
                                        <MenuItem
                                            onClick={() => {}}
                                            label="Your Orders"
                                        />
                                        <hr />
                                        <MenuItem
                                            onClick={() => signOut()}
                                            label="Sign Out"
                                        />
                                    </div>
                                </div>

                            )}
                        </>
                    ) : (
                        <div
                            onClick={loginModal.onOpen}
                            className="
                                p-4
                                md:py-1
                                md:px-2
                                border-[1px]
                                border-neutral-200
                                flex
                                flex-row
                                items-center
                                gap-3
                                rounded-full
                                cursor-pointer
                                hover:shadow-md
                                transition
                            "
                        >
                            <Avatar src={""}/>
                            Sign in
                        </div>
                    )

                    }
                </div>

            </div>
        </div>
    );
}

export default UserMenu;