'use client'
import { useState } from 'react';
import styles from './profile.module.scss';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserRole } from '@/services/user';
import { setUser } from '@/store/user/userSlice';

const ProfileComponent = () => {

    const [role, setRole] = useState<'editor' | 'viewer' | 'admin'>('viewer');
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const {data} = user;

    const handleChangeRole = async (e: React.MouseEvent<HTMLButtonElement>) => {
       console.log(role)
       const newUser = await updateUserRole(role, data?._id as string);
       dispatch(setUser(newUser))
    }

    return(
        <div className={styles.profilePage}>
            <h1>profile</h1>
            <div>
                <h3>Email: {data?.email}</h3>
                <h3>Name: {data?.name}</h3>
                <h3>Role: {data?.role}</h3>
            </div>
            <select  onChange={(e)=> setRole(e.target.value as "admin" | "viewer" | "editor")} name="role">
                <option  value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleChangeRole}>Change</button>
        </div>
    )
}

export default ProfileComponent;