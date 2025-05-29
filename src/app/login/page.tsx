'use client'
import styles from './page.module.scss';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useState } from "react";

const LogInPage = () => {

    const {handleLogIn} = useAuthActions();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        try {
            await handleLogIn(email, password);
        } catch (error: unknown) {
            let message = 'An unexpected error occurred during login.';
            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            setError(message);
        }
    }

    return(
        <div className={styles.logInPage}>
            <h1 className="">Log In</h1>
            <form onSubmit={handleSubmit} className="">
                <div className="">
                    <input placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name='email' id="email" className="" required />
                </div>
                <div className="">
                    <input placeholder='password'  value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name='password' id="password" className="" required />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="">Log In</button>
            </form>
        </div>
    )
}

export default LogInPage;