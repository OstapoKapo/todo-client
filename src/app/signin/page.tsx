'use client';
import { useState } from 'react';
import './page.module.scss';
import { useAuthActions } from '@/hooks/useAuthActions';
const SigninPage = () => {
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<"admin" | "viewer" | "editor">('viewer');
    const [error, setError] = useState<string | null>(null);

    const { handleSignIn } = useAuthActions();

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!email || !password || !name) {
            setError('pls fill all fields');
            return;
        }
        
        try {
            await handleSignIn(email, password, name, role);
        } catch (error: any) {
            setError(error.message || 'An unexpected error occurred during login.');
        }
    }
        

    return (
        <div className="signInPage">
        <h1>Sign In</h1>
        <form onSubmit={handleSumbit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="userName" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  name="email" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input value={password} minLength={6} onChange={(e) => setPassword(e.target.value)} type="password"  name="password" required />
            </div>
            <select value={role} onChange={(e)=> setRole(e.target.value as "admin" | "viewer" | "editor")} name="role">
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
            </select>
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign In</button>
        </form>
        </div>
    );
}

export default SigninPage;