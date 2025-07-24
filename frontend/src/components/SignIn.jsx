 

import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation after successful login
  const {user, login } = useContext(UserContext);
 const handleSignIn = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    await axios.post(
      'http://localhost:5000/api/auth/login', 
      { email, password },
      { withCredentials: true } 
    );
    await login();
    
    navigate('/');
  } catch (error) {
    setError(error.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (user) {
    navigate('/dashboard');
  }
}, [user, navigate]);

  return (
    <div className="max-w-sm mx-auto mt-10 font-montserrat">
          <h2 className='text-4xl font-montserrat text-coral-red font-bold my-6'>
            Sign <span className='text-black' >In</span>
          </h2>
    <form onSubmit={handleSignIn} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <label className="input input-bordered flex items-center gap-2">
       <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="h-4 w-4 opacity-70">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
       <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="h-4 w-4 opacity-70">fill-rule
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5z" clipRule="evenodd" />
</svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button
        type="submit"
        className="btn  text-white bg-coral-red w-full py-2 mt-4 text-xl"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  </div>
  )
}

export default SignIn