'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './header.module.scss';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { fetchAdminUI, setActiveSection } from '@/store/AdminView/AdminViewSlice'
import { useEffect, useRef } from 'react';
import { logout } from '@/services/auth';
import { setUser } from '@/store/user/userSlice';


const Header: React.FC = () => {


    const route = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const {tittle} = useAppSelector(state => state.adminView);
    const user = useAppSelector(state => state.user);
    const {data} = user;
    const ul = useRef<HTMLUListElement>(null);

    useEffect(()=>{
        dispatch(fetchAdminUI())
    }, []);

    const handleChangesection = (e: React.MouseEvent<HTMLUListElement>) => {
        const target = e.target as HTMLLIElement;
        if(target.tagName === 'LI') {
            for (const children of ul.current?.children as HTMLCollection) {
                if(children instanceof HTMLLIElement) {
                    children.classList.remove(styles.liActive);
                }
            }
            target.classList.add(styles.liActive);
        }
    }

    const handleLogout = async () => {
        try{
            await logout();
            dispatch(setActiveSection('todo'));
            dispatch(setUser(null));
            route.push('/')
        }catch (error) {
            console.error('Error during logout:', error);
        }
    }



    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src={"/icon/todo-favicon.png"} alt='logoImg' width={40} height={40}></Image>
                <h1>{tittle}</h1>
            </div>
            {pathname === '/admin' && (
            <nav className={styles.nav}>
                <ul ref={ul} onClick={handleChangesection}>
                    <li   onClick={() => {dispatch(setActiveSection('todo'))}} className={styles.liActive}>To-do</li>
                    <li style={{display: data?.role === 'admin' ? 'flex' : 'none'}} onClick={() => {dispatch(setActiveSection('users'))}} >Users</li>
                    <li onClick={() => {dispatch(setActiveSection('settings'))}}>Setings</li>
                    <li onClick={() => {dispatch(setActiveSection('profile'))}}>Profile</li>
                </ul>
                <button onClick={handleLogout}>Log Out</button>
            </nav>
            )}
        </header>
    );
}

export default Header;