'use client'
import {SafeUser} from "@/types";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


interface ProfileInfoFormProps{
    currentUser?: SafeUser | null
}

const ProfileInfoForm = ({currentUser}: ProfileInfoFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: currentUser ? currentUser.name : "",
        email: currentUser ? currentUser.email : "",
        phoneNumber: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.patch('/api/updateProfile', {
            id: currentUser?.id,
            email: formData.email,
            username: formData.username
        })
            .then(() => {
                toast.success('Updated!');
                router.refresh();
            })
            .catch((error) => {
                const errorMessage = error.message ? error.message : "An error occurred";
                toast.error(errorMessage);
            })
    };

    return(
        <div className="flex flex-col items-start">
            <div className="items-start ml-16 text-3xl font-semibold">
                Profile Information
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 ml-28 mt-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update Information
                </button>
            </form>
        </div>
    );
}

export default ProfileInfoForm;