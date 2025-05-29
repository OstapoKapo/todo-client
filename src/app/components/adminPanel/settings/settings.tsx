'use client';
import styles from './settings.module.scss';
import { getUI, updateUI } from "@/services/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import {setNewUI} from "@/store/AdminView/AdminViewSlice";


const SettingsComponent = () => {

    const dispatch = useAppDispatch();
    const {tittle, footer} = useAppSelector(state => state.adminView); 

    const user = useAppSelector(state => state.user);
    const {data} = user;

    const [newTittle, setNewTittle] = useState<string>('');
    const [newFooter, setNewFooter] = useState<string>('');
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await updateUI(newTittle, newFooter);
            const updatedUI = await getUI();
            if (updatedUI) {
                dispatch(setNewUI({ tittle: updatedUI.tittle, footer: updatedUI.footer }));
            }
            setNewTittle('');
            setNewFooter('');
        }catch (error) {
            console.error('Error updating settings:', error);
        }
    }

    return(
        <div className={styles.settings}>
            <h1>setings</h1>
            <div>
                <p>footer: {footer}</p>
                <p>tittle: {tittle}</p>
            </div>
            <form style={{display: data?.role === 'viewer' ? 'none' : ''}} onSubmit={handleSubmit}>
            <div className="mb-6">
                <input placeholder='tittle'  value={newTittle} onChange={(e)=> setNewTittle(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
            </div>
            <div className="mb-6">
                <input placeholder='footer'  value={newFooter} onChange={(e)=> setNewFooter(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
            </div>
            <button>Update</button>
            </form>
        </div>
    )
}

export default SettingsComponent;