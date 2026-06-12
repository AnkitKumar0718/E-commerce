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
        <div className='min-h-screen bg-cream flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8'>
                <div className='hidden lg:flex flex-col justify-center rounded-[32px] bg-gold-light p-10 shadow-card border border-gold/20'>
                    <div className='mb-8'>
                        <p className='text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3'>Welcome back</p>
                        <h2 className='font-serif text-4xl lg:text-5xl font-bold text-primary leading-tight'>Login to your shop account</h2>
                    </div>
                    <p className='text-muted text-sm leading-7'>Access your wishlist, track orders, and manage your cart with a seamless, luxurious shopping experience.</p>
                    <div className='mt-10 space-y-4'>
                        <div className='flex items-start gap-3'>
                            <span className='mt-1 w-2 h-2 rounded-full bg-gold' />
                            <p className='text-sm text-charcoal'>Saved payment methods and fast checkout.</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='mt-1 w-2 h-2 rounded-full bg-gold' />
                            <p className='text-sm text-charcoal'>Exclusive offers for members.</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <span className='mt-1 w-2 h-2 rounded-full bg-gold' />
                            <p className='text-sm text-charcoal'>Secure authentication for your profile.</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-[32px] border border-cream-3 shadow-card p-8'>
                    <div className='mb-6 text-center'>
                        <p className='text-gold uppercase text-xs tracking-[0.3em] font-semibold mb-2'>Member login</p>
                        <h2 className='font-serif text-3xl font-bold text-primary'>Sign in to continue</h2>
                        <p className='text-muted text-sm mt-2'>Enter your credentials to access your personalized store dashboard.</p>
                    </div>

                    {error && <p className='text-red-600 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-5 text-sm text-center'>{error}</p>}

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-semibold text-charcoal mb-2'>Email address</label>
                            <input
                                id='email'
                                type='email'
                                className='input-light'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-semibold text-charcoal mb-2'>Password</label>
                            <input
                                id='password'
                                type='password'
                                className='input-light'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-3 bg-gold text-white uppercase text-sm font-semibold tracking-[0.12em] rounded-none shadow-gold hover:bg-gold-dark transition-colors duration-200'
                        >
                            Login
                        </button>
                    </form>

                    <p className='mt-6 text-center text-sm text-muted'>
                        Don&apos;t have an account? <Link to='/signup' className='text-gold font-semibold hover:text-gold-dark'>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
