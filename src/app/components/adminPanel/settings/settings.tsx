'use client';

import { updateUI } from "@/services/ui";
import { useState } from "react";

const SettingsComponent = () => {

    const [tittle, setTittle] = useState<string>('');
    const [footer, setFooter] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
console.log(tittle, footer)
        try{
            await updateUI(tittle, footer);
        }catch (error) {
            console.error('Error updating settings:', error);
        }

    }

    return(
        <div>
            <h1>setings</h1>
            <p>Here you can change tiitle and footer</p>
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Tittle</label>
                <input  value={tittle} onChange={(e)=> setTittle(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Footer</label>
                <input  value={footer} onChange={(e)=> setFooter(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
            </div>
            <button>Update</button>
            </form>
        </div>
    )
}

export default SettingsComponent;