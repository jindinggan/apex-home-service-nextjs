
import Container from "@/components/Container";



import getCurrentUser from "@/app/actions/getCurrentUser";
import UserBanner from "@/app/(profile)/components/UserBanner";
import SideBar from "@/app/(profile)/components/SideBar";
import ProfileInfoForm from "@/app/(profile)/components/forms/ProfileInfoForm";
import ContactInfoForm from "@/app/(profile)/components/forms/ContactInfoForm";

export default async function EditContact() {

    const currentUser = await getCurrentUser();


    return (
        <div className="flex">
            <SideBar selected={"editContact"}/>
            <ContactInfoForm currentUser={currentUser}/>
        </div>
    );
}
