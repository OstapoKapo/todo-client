'use client';
import styles from './users.module.scss';
import {User} from '@/types';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/user';


const UsersComponent = () => {

    const [users, setUsers] = useState<User[] | null>(null);

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

    return(
        <div className={styles.users}>
            <h1>Users</h1>
            <p>This is the all users of the admin panel.</p>
            <div className={styles.container}>
                {users?.map((user, index)=>(
                    <div key={index} className={styles.item}>
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
                ))}
            </div>
        </div>
    )
}

export default UsersComponent;