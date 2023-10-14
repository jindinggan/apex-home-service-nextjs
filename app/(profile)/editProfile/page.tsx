

import SideBar from "@/app/(profile)/components/SideBar";
import ProfileInfoForm from "@/app/(profile)/components/forms/ProfileInfoForm";
import getCurrentUser from "@/app/actions/getCurrentUser";


export default async function EditProfile() {

    const currentUser = await getCurrentUser();


    return (
        <div className="flex">
            <SideBar selected={"editProfile"}/>
            <ProfileInfoForm currentUser={currentUser}/>
        </div>
    );
}
