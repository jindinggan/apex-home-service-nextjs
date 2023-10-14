'use client'
import React, {useState} from 'react';

const SearchBarWithDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [zipCode, setZipCode] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value);
    };

    const handleSearch = () => {
        // Implement your search logic here, including using the 'zipCode' state.
        console.log(`Searching with zip code: ${zipCode}`);
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Enter your search..."
                onClick={toggleDropdown}
                className="w-full rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={handleZipCodeChange}
                className="w-1/4 px-4 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Search
            </button>
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-lg">
                    {/* Add your scrollable dropdown menu items here */}
                    <div className="px-4 py-2">Item 1</div>
                    <div className="px-4 py-2">Item 2</div>
                    <div className="px-4 py-2">Item 3</div>
                </div>
            )}
        </div>
    );
};

export default SearchBarWithDropdown;