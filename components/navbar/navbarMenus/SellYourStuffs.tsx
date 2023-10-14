'use client';

import React, {useEffect, useState, useRef, useCallback} from "react";
import MenuItem from "@/components/navbar/navbarMenus/MenuItem";
import {SafeUser} from "@/types";
import loginModal from "@/components/modals/LoginModal";
import sellModal from "@/components/modals/SellModal";
import useLoginModal from "@/hooks/useLoginModal";
import useSellModal from "@/hooks/useSellModal";

interface SellYourStuffsProps {
    currentUser?: SafeUser | null;
}
const SellYourStuffs = ({currentUser}: SellYourStuffsProps) => {
    const loginModal = useLoginModal();
    const sellModal = useSellModal();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const onSell = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        sellModal.onOpen();
    }, [currentUser, loginModal, sellModal]);

    return (
        <div className="relative -mr-[220px]">
            <div
                onClick={onSell}
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
                Sell Your Stuffs
            </div>
        </div>


    );
}

export default SellYourStuffs;