import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';
import { useContext, useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        setError('');
        try {
            await signup(email, password);
            addToast('Account created successfully!', 'success');
            navigate('/');
        } catch (err) {
            const errorMessage = err.code === 'auth/email-already-in-use'
                ? 'Email already in use. Try logging in.'
                : err.code === 'auth/weak-password'
                    ? 'Password should be at least 6 characters.'
                    : 'Failed to create an account.';
            setError(errorMessage);
            addToast(errorMessage, 'error');
            console.error(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-orange-50 px-4 pt-20 pb-10'>
            <div className='max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-orange-100 mt-6 mb-10'>
                <h2 className='text-2xl font-bold text-primary mb-4 text-center'>Sign Up</h2>
                {error && <p className='text-red-500 bg-red-50 p-2 rounded mb-4 text-center text-sm'>{error}</p>}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1 text-sm'>Email</label>
                        <input
                            type='email'
                            className='w-full p-2 border border-gray-300 rounded focus:border-primary outline-none text-sm'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1 text-sm'>Password</label>
                        <input
                            type='password'
                            className='w-full p-2 border border-gray-300 rounded focus:border-primary outline-none text-sm'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1 text-sm'>Confirm Password</label>
                        <input
                            type='password'
                            className='w-full p-2 border border-gray-300 rounded focus:border-primary outline-none text-sm'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full flex items-center justify-center h-10 bg-primary text-white rounded font-bold hover:bg-opacity-90 transition text-sm'
                    >
                        Sign Up
                    </button>
                </form>
                <p className='mt-4 text-center text-gray-600 text-sm'>
                    Already have an account? <Link to='/login' className='text-red-500 font-semibold hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
