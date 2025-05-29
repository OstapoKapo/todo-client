'use client';
import Image from 'next/image';
import styles from './users.module.scss';
import {User} from '@/types';
import { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '@/services/user';
import { useAppSelector } from '@/store/hooks';


const UsersComponent = () => {

    const [users, setUsers] = useState<User[] | null>(null);
    const user = useAppSelector(state => state.user);
    const {data} = user;

    useEffect(() => {
        const getUsers = async () => {
            try{
                const data = await getAllUsers();
                setUsers(data || null);
            }catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getUsers();
    },[])

    const handleDelete = async (e: React.MouseEvent<HTMLImageElement>) => {
        const userId = (e.target as HTMLImageElement).dataset.id;
        if (!userId) return;
        try{
            const response = await deleteUser(userId);
            setUsers(response || null);
        }catch(error){
            console.error('Error deleting user:', error);
        }
    }

    return(
        <div className={styles.users}>
            <h1>Users</h1>
            <p>This is the all users of the admin panel.</p>
            <div className={styles.container}>
                {users?.map((user)=>(
                    <div key={user._id} className={styles.itemContainer}>
                        <div className={styles.item}>
                            <div>
                                <h2>Name:</h2>
                                <h4>{user.name}</h4>
                            </div>
                            <div>
                                <h2>Email:</h2>
                                <h4>{user.email}</h4>
                            </div>
                            <div>
                                <h2>Role:</h2>
                                <h4>{user.role}</h4>
                            </div>
                        </div>
                        <Image style={{display: user._id === data?._id ? 'none' : 'flex'}} onClick={handleDelete} data-id={user._id} src="/icon/trash.png" alt="trashImg" width={60} height={60}></Image>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersComponent;