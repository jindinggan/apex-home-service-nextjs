'use client';

// Importing useState from react for managing local state
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface FilterProps{
    category: string;
    directory: string;
}
const Filter: React.FC<FilterProps> = ({category, directory}) => {
    // Initializing state variables for managing the filters and their visibility
    const [appearanceFilter, setAppearanceFilter] = useState<string[]>([]); // Changed to array
    const [functionalityFilter, setFunctionalityFilter] = useState<string[]>([]); // Changed to array
    const [isAppearanceExpanded, setAppearanceExpanded] = useState<boolean>(false);
    const [isFunctionalityExpanded, setFunctionalityExpanded] = useState<boolean>(false);
    const router = useRouter();

    // Arrays containing the different options for the filters
    const appearances: string[] = ['Like New', 'Slightly Used', 'Used'];
    const functionalities: string[] = ['Fully Functional', 'Partially Functional', 'Not Functional/Broken'];



    const navigateToFilteredPage = () => {
        // Construct the URL with the selected filters as params
        const appearanceParams = appearanceFilter.length > 0 ? appearanceFilter.map(filter => `appearance=${filter}`).join('&') : '';
        const functionalityParams = functionalityFilter.length > 0 ? functionalityFilter.map(filter => `functionality=${filter}`).join('&') : '';
        const queryParams = [appearanceParams, functionalityParams].filter(param => param).join('&');
        const url = `/${directory}/${category}${queryParams ? '?' + queryParams : ''}`;

        // Replace the current entry in the history stack with the constructed URL
        router.push(url);
    };

    useEffect(() => {
        navigateToFilteredPage(); // Call the navigate function after the filter state has been updated
    }, [appearanceFilter, functionalityFilter]);

    return (
        <div className="flex pt-24">
            <div className="w-64 p-4">
                <div className="relative mb-4">
                    <button
                        onClick={() => setAppearanceExpanded(!isAppearanceExpanded)}
                        className="w-full p-2 rounded flex justify-between items-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                        <span>Appearance Filter</span>
                        <span className={`transform transition-transform duration-1000 ${isAppearanceExpanded ? 'rotate-180' : ''}`}>&#x25BC;</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-1000 ${isAppearanceExpanded ? 'h-auto opacity-1 visible' : 'h-0 opacity-0 invisible'}`}>
                        {appearances.map(appearance => (
                            <button
                                key={appearance}
                                className="w-full p-2 flex items-center hover:text-green-500 transition-colors"
                                onClick={() => toggleFilter(appearanceFilter, setAppearanceFilter, appearance)}
                            >
                                <span className="mr-2">
                                    <input type="checkbox" checked={appearanceFilter.includes(appearance)} readOnly />
                                </span>
                                {appearance}
                            </button>
                        ))}
                    </div>
                    <hr/>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setFunctionalityExpanded(!isFunctionalityExpanded)}
                        className="w-full p-2 rounded flex justify-between items-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                        <span>Functionality Filter</span>
                        <span className={`transform transition-transform duration-1000 ${isFunctionalityExpanded ? 'rotate-180' : ''}`}>&#x25BC;</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-1000 ${isFunctionalityExpanded ? 'h-auto opacity-1 visible' : 'h-0 opacity-0 invisible'}`}>
                        {functionalities.map(functionality => (
                            <button
                                key={functionality}
                                className="w-full p-2 flex items-center hover:text-green-500 transition-colors"
                                onClick={() => toggleFilter(functionalityFilter, setFunctionalityFilter, functionality)}
                            >
                                <span className="mr-2">
                                    <input type="checkbox" checked={functionalityFilter.includes(functionality)} readOnly />
                                </span>
                                {functionality}
                            </button>
                        ))}
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    );
}

export default Filter;


