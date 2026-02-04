import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';
import { useContext, useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            addToast('Login successful!', 'success');
            navigate('/');
        } catch (err) {
            const errorMessage = err.code === 'auth/user-not-found'
                ? 'No account found with this email.'
                : err.code === 'auth/wrong-password'
                    ? 'Incorrect password.'
                    : 'Failed to log in. Please check your credentials.';
            setError(errorMessage);
            addToast(errorMessage, 'error');
            console.error(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-orange-50 px-4 pt-20 pb-10'>
            <div className='max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-orange-100 mt-6 mb-10'>
                <h2 className='text-2xl font-bold text-primary mb-4 text-center'>Login</h2>
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
                    <button
                        type='submit'
                        className='w-full flex items-center justify-center h-10 bg-primary text-white rounded font-bold hover:bg-opacity-90 transition text-sm'
                    >
                        Login
                    </button>
                </form>
                <p className='mt-4 text-center text-gray-600 text-sm'>
                    Don't have an account? <Link to='/signup' className='text-red-500 font-semibold hover:underline'>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
