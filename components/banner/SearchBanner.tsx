'use client';

import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import 'font-awesome/css/font-awesome.min.css';
import toggle = Simulate.toggle;
import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";
import useRegisterModal from "@/hooks/useRegisterModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
const SearchBanner = () => {
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);
    const [zipCode, setZipCode] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = () => {
        // Implement your search logic here, including using the 'zipCode' state.
        console.log(`Searching with zip code: ${zipCode}`);
    };

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value);
    };

    return (
        <div>
            <div className="relative w-full min-h-[450px] bg-cover bg-center"
                 style={{backgroundImage: 'url("/images/bannerImage.jpg")'}}>
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Container for the two divs */}
                <div className="grid grid-cols-5 h-full absolute inset-0">

                    {/* Original Div */}
                    <div className="col-span-4 flex items-center justify-center">
                        <div className="text-white text-center p-4">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl mb-4">Find trusted Professionals Now!</h1>
                            <div className="flex justify-center items-center">
                                <input type="text" placeholder="Find your professionals" onClick={toggleDropdown}
                                       className="w-full rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                <span className="relative inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                            <i className="fa fa-map-marker text-black bg-white p-2" style={{ fontSize: '1.5em' }}></i> {/* Font Awesome zip code icon */}
                        </span>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={zipCode}
                                    onChange={handleZipCodeChange}
                                    className="w-1/4 px-4 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    className="bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* New Div to the right */}
                    <div className="col-span-1 bg-transparent flex items-center justify-center flex-col">
                        <div className="w-full max-w-sm"> {/* Adjusted from max-w-xs to max-w-sm for a bit more width */}
                            <button onClick={() => signIn('google')}
                                    className="flex items-center justify-center bg-white w-4/5 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4">
                                <FcGoogle size={24} className="mr-2" />
                                <div className="border-r h-6 mx-2"></div>
                                <span>Continue with Google</span>
                            </button>
                            <div className="w-4/5 relative mt-2 text-center">
                                <div className="flex justify-center items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-4 text-white">Or</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                            </div>
                            <button
                                onClick={registerModal.onOpen}
                                className="mt-4 w-4/5 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                SignUp with Email
                            </button>
                        </div>
                    </div>












                </div>
            </div>
        </div>




    );
}

export default SearchBanner;