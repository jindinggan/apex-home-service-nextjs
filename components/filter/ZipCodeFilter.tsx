'use client';

import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

interface ZipCodeFilterProps {
    category: string;
    directory: string;
}

const ZipCodeFilter: React.FC<ZipCodeFilterProps> = ({ category, directory }) => {
    const [zipcode, setZipcode] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        if(zipcode.length < 5) {
            toast.error("Please enter a 5-digit Zipcode!");
        } else {
            const url = `/${directory}/${category}?zipcode=${zipcode}`
            router.push(url);
        }

    }

    return (
        <div className="bg-rose-500 flex flex-col items-center justify-center h-64 mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl mb-4 text-white">Find Professional Services Near You!</p>
            <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-10 flex items-center">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Your Zipcode"
                        className="pl-10 flex-grow p-2 border rounded-l-md focus:outline-none focus:border-blue-500"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-map-marker-alt"></i>
                    </span>
                </div>
                <button
                    type="submit"
                    className="text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none bg-rose-700"
                >
                    Find
                </button>
            </form>
        </div>
    );
}

export default ZipCodeFilter;
