'use client';

import React, {useState, useRef, useEffect, useCallback} from "react";
import MenuItem from "@/components/navbar/navbarMenus/MenuItem";
import Image from 'next/image';
import dropdownIcon from "@/assets/dropdownIcon.png";
import useLoginModal from "@/hooks/useLoginModal";
import useMessageModal from "@/hooks/useMessageModal";
import {SafeUser} from "@/types";
interface SendMessageButtonProps {
    currentUser?: SafeUser | null;
}
const SendMessageButton = ({currentUser}: SendMessageButtonProps) => {
    const loginModal = useLoginModal();
    const messageModal = useMessageModal();

    const onSend = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        messageModal.onOpen();
    }, [currentUser, loginModal, messageModal]);

    return(
        <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={onSend}>
            Send Message
        </button>
    );
}

export default SendMessageButton