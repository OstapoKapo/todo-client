import styles from './footer.module.scss';

interface FooterProps {
    footer: string | undefined;
}

const Footer: React.FC<FooterProps> = ({footer}) => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()}{footer}</p>
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