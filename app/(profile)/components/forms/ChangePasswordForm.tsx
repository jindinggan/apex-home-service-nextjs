'use client'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import {SafeUser} from "@/types";


interface ChangePasswordFormProps{
    currentUser?: SafeUser | null
}

const ChangePasswordForm = ({currentUser}: ChangePasswordFormProps) => {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('New password and confirm password must be the same');
            return;
        }

        try {
            const response = await axios.patch('/api/changePassword', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            if (response.status === 200) {
                alert('Password successfully changed');
                // Reset form or navigate the user to another page
            }
        } catch (error) {
            alert('Error changing password');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <div className="items-start ml-16 text-3xl font-semibold">
                Change Password
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 ml-28 mt-6">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;