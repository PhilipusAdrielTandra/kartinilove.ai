import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-white ">
        <Link to="/">
          <img src={Logo} className='w-60 p-8'/>
        </Link>
      <div className="bg-white p-8 rounded-2xl w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">Log In</h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF0753] focus:border-[#EF0753] transition"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF0753] focus:border-[#EF0753] transition"
              placeholder="Password"
              required
            />
            <div className="flex justify-end items-center pt-4 font-bold">
              <a href="#" className="text-sm font-medium text-[#EF0753] hover:text-[#d30649]">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EF0753] text-white py-3 px-4 rounded-lg hover:bg-[#d30649] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF0753] transition font-medium"
          >
            Log In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="p-2"
              title="Sign in with Google"
            >
              <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
              </svg>
            </button>
            
            <button
              className="p-2"
              title="Sign in with Facebook"
            >
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </button>
            
            <button
              className="p-2 "
              title="Sign in with Apple"
            >
              <svg className="h-5 w-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-[#EF0753] hover:text-[#d30649]">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;