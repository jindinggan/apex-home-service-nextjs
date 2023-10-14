import Container from "@/components/Container";
import Logo from "@/components/navbar/Logo";
import Search from "@/components/navbar/Search";
import UserMenu from "@/components/navbar/UserMenu";
import FindProfessional from "@/components/navbar/navbarMenus/FindProfessional";
import SellYourStuffs from "@/components/navbar/navbarMenus/SellYourStuffs";
import PostYourService from "@/components/navbar/navbarMenus/PostYourService";
import QuickSearch from "@/components/navbar/navbarMenus/Search";

import {compileNonPath} from "next/dist/shared/lib/router/utils/prepare-destination";
import {SafeUser} from "@/types";
import PostSpecialOffer from "@/components/navbar/navbarMenus/PostSpecialOffer";

interface NavbarProps {
    currentUser?: SafeUser | null;
}



const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    console.log({currentUser});
    return(
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0

                        "
                    >
                        <Logo />
                        <FindProfessional />
                        <QuickSearch />
                        <PostSpecialOffer currentUser={currentUser}/>
                        <SellYourStuffs currentUser={currentUser}/>
                        <PostYourService currentUser={currentUser}/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;