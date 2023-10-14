'use client';

import { useState } from 'react'
import {BiSearch} from 'react-icons/bi';

const QuickSearch = ({search}: { search?: string }) => {
    const [text, setText] = useState(search)

    return (
        <div className="relative w-1/4 -ml-[200px]">
            <div className="pointer-events-none absolute p-2 bg-rose-500 rounded-full flex items-center text-white m-2">
                <BiSearch size={16}/>
            </div>
            <input value={text} placeholder='Search...'
                   onChange={e => setText(e.target.value)}
                   className="block border-[1px] w-full outline-none h-12 py-2 pl-12 rounded-full text-gray-900  placeholder:text-gray-400 transition"/>
        </div>
    );
}

export default QuickSearch;
