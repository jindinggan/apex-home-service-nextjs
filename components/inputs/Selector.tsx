'use client';


import {useCallback, useState} from "react";

interface SelectorProps {
    title: string;
    subtitle: string;
    labels: string[];
    label: string;
    onChange: (value: string) => void;
}
const Selector: React.FC<SelectorProps> = ({
    title,
    subtitle,
    labels,
    label,
    onChange
                                           }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const onSelect = useCallback((label: string) => {
        setIsOpen(false);
        onChange(label);
    }, [onChange, label])


    return(
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="
                font-light
                text-xl
                text-neutral-600
                "
            >
                <div onClick={toggleDropdown} className="cursor-pointer">{label}</div>
                {isOpen && (
                    <div>
                        {labels.map((label, index) => (
                            <div key={index} onClick={() => {onSelect(label)}} className="cursor-pointer">
                                {label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Selector;

