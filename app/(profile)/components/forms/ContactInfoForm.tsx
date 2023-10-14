'use client'
import {SafeUser} from "@/types";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


interface ContactInfoFormProps{
    currentUser?: SafeUser | null
}

const ContactInfoForm = ({currentUser}: ContactInfoFormProps) => {
    const [formData, setFormData] = useState({
        city: "",
        state: "",
        country: "",
        zipcode: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform an Axios call to your API endpoint to update the contact info.
        axios.patch('/api/updateContactInfo', formData)
            .then(() => {
                // Handle success
            })
            .catch((error) => {
                // Handle error
            });
    };

    return (
        <div className="flex flex-col items-start">
            <div className="items-start ml-16 text-3xl font-semibold">
                Contact Information
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 ml-28 mt-6">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-600">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-600">Zipcode</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
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

export default ContactInfoForm;