'use client';

import React, { useState, useRef, useEffect } from "react";
import MenuItem from "@/components/navbar/navbarMenus/MenuItem";
import Image from 'next/image';
import dropdownIcon from "@/assets/dropdownIcon.png";

const FindProfessional = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = (event: MouseEvent) => {
        // @ts-ignore
        if (menuRef.current && !menuRef.current?.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenu);
        return () => {
            document.body.removeEventListener('click', closeMenu);
        };
    }, []);

    return(
        <div className="relative -ml-[220px]">
            <div
                onClick={toggleMenu}
                className="
                    md:py-2
                    md:px-3
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    transition
                    hover:bg-neutral-100
                    active:bg-neutral-100
                    text-[17px]
                    font-semibold
                "
            >
                Find a Professional
                <Image src={dropdownIcon} alt="dropdown icon" width={14} height={14}/>
            </div>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="
                        absolute
                        shadow-md
                        w-[40vw]
                        md:w-full
                        bg-white
                        overflow-hidden
                        right-0
                        top-14
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        <MenuItem
                            onClick={() => {}}
                            label="Category 1"
                        />
                        <MenuItem
                            onClick={() => {}}
                            label="Category 2"
                        />
                        <MenuItem
                            onClick={() => {}}
                            label="Category 3"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FindProfessional;