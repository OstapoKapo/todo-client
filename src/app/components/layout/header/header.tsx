'use client';
import { useAppDispatch } from '@/store/hooks';
import styles from './header.module.scss';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { setActiveSection } from '@/store/AdminView/AdminViewSlice'

interface HeaderProps {
    tittle: string | undefined;
}

const Header: React.FC<HeaderProps> = ({tittle}) => {

    const pathname = usePathname();
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src={"/icon/todo-favicon.png"} alt='logoImg' width={40} height={40}></Image>
                <h1>{tittle}</h1>
            </div>
            {pathname === '/admin' && (
            <nav className={styles.nav}>
                <ul>
                    <li onClick={() => {dispatch(setActiveSection('users'))}} className={styles.liActive}>Users</li>
                    <li onClick={() => {dispatch(setActiveSection('todo'))}}>To-do</li>
                    <li onClick={() => {dispatch(setActiveSection('settings'))}}>Setings</li>
                    <li onClick={() => {dispatch(setActiveSection('profile'))}}>Profile</li>
                </ul>
                <button>Log Out</button>
            </nav>
            )}
        </header>
    );
}

export default Header;