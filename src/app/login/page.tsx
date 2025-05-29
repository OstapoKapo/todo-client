'use client'

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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Log In</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input  value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">Log In</button>
            </form>
        </div>
    )
}

export default LogInPage;