'use client';
import { useAppSelector } from '@/store/hooks';
import styles from './footer.module.scss';


const Footer: React.FC= () => {

    const {footer} = useAppSelector(state => state.adminView);

    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()}{'  ' + footer}</p>
            <nav className="footer-nav">
                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;