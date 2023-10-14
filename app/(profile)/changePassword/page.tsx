
import Container from "@/components/Container";



import getCurrentUser from "@/app/actions/getCurrentUser";
import UserBanner from "@/app/(profile)/components/UserBanner";
import SideBar from "@/app/(profile)/components/SideBar";
import ProfileInfoForm from "@/app/(profile)/components/forms/ProfileInfoForm";
import ContactInfoForm from "@/app/(profile)/components/forms/ContactInfoForm";
import ChangePasswordForm from "@/app/(profile)/components/forms/ChangePasswordForm";

export default async function EditContact() {

    const currentUser = await getCurrentUser();


    return (
        <div className="flex">
            <SideBar selected={"changePassword"}/>
            <ChangePasswordForm currentUser={currentUser}/>
        </div>
    );
}
