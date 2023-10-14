import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

export type ZipCodeSelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}

interface ZipCodeInputProps {
    value?: string;
    onZipCodeChange?: (zipCode: string, area: string) => void;
    onChange: (value: ZipCodeSelectValue) => void;
}

const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ value, onZipCodeChange, onChange }) => {
    const [inputValue, setInputValue] = useState<string>(value || '');
    const [area, setArea] = useState<string>('');
    const [suggestions, setSuggestions] = useState<ZipCodeSelectValue[]>([]);

    useEffect(() => {
        if (inputValue.length === 5) {
            fetchArea(inputValue);
        }
    }, [inputValue]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue) && newValue.length <= 5) {
            setInputValue(newValue);
            if (newValue === '') {
                setArea('');
                setSuggestions([]);
            }
        }
    };

    const fetchArea = async (zipCode: string) => {
        const apiKey = 'AIzaSyB8QvQGAJWy9grhOzInb-oGAPAdD2TMcZA';
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}&language=en`);
            const results = response.data.results;
            if (results.length > 0) {
                const components = results[0].address_components;
                const location = results[0].geometry.location;
                const latlng: number[] = [location.lat, location.lng];
                const stateObj = components.find((c: any) => c.types.includes('administrative_area_level_1'));
                const countryObj = components.find((c: any) => c.types.includes('country'));
                const localityObj = components.find((c: any) => c.types.includes('locality'));
                const state = stateObj ? stateObj.short_name : '';
                const country = countryObj ? countryObj.short_name : '';
                const locality = localityObj ? localityObj.short_name : '';
                setSuggestions([{
                    label: `${locality}, ${state}, ${country}`,
                    latlng,
                    region: state,
                    value: zipCode,
                    flag: ''
                }]);
            } else {
                setSuggestions([{ label: 'Unknown Area', latlng: [], region: '', value: zipCode, flag: '' }]);
            }
        } catch (error) {
            console.error('Error fetching area', error);
            setSuggestions([{ label: 'Error fetching area', latlng: [], region: '', value: zipCode, flag: '' }]);
        }
    };

    const handleSuggestionClick = (suggestion: ZipCodeSelectValue) => {
        setArea(suggestion.label);
        onZipCodeChange && onZipCodeChange(inputValue, suggestion.label);
        console.log("suggestion: " + suggestion.value)
        onChange && onChange(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter 5-digit Zip Code"
                value={inputValue}
                onChange={handleInputChange}
                className="p-3 border-2 text-lg rounded-lg"
                style={{ borderColor: 'black', backgroundColor: 'white' }}
            />
            {suggestions.length > 0 && (
                <ul className="border rounded mt-2 overflow-hidden">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
            {area && <div className="mt-2">{area}</div>}
        </div>
    );
};

export default ZipCodeInput;
