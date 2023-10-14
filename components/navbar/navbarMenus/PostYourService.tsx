'use client'

import React, {useCallback, useRef, useState} from "react";
import {SafeUser} from "@/types";
import useLoginModal from "@/hooks/useLoginModal";
import useServiceModal from "@/hooks/useServiceModal";

interface PostYourServiceProps {
    currentUser?: SafeUser | null;
}
const PostYourService = ({currentUser}: PostYourServiceProps) => {
    const loginModal = useLoginModal();
    const serviceModal = useServiceModal();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const onPost = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        serviceModal.onOpen();
    }, [currentUser, loginModal, serviceModal]);
    return(
        <div className="relative -mr-[220px]">
            <div
                onClick={onPost}
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    md:py-2
                    md:px-4
                    border-neutral-200
                    rounded-full
                    cursor-pointer
                    hover:bg-neutral-100
                    active:bg-neutral-100
                    text-[16px]
                    font-semibold
                "
            >

                <div>Post Your Services</div>
            </div>
        </div>
    );
}

export default PostYourService;