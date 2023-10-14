'use client';
import Container from "@/components/Container";


import {useState} from "react";

export default function Profile() {

    // Initialize state variables for user name and email
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const handleSave = () => {
        // Here you would typically update the user profile on the server
        alert(`Saved: ${name}, ${email}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        </div>
    );
}
