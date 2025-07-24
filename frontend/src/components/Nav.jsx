import { navLinks } from '../constants';
import { NavLink, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect } from 'react';

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
useEffect(() => {
}, [user, navigate]);

  return (
    <div className="navbar sticky top-0 padding-x bg-slate-100 z-[15] w-full font-montserrat">
      {/* Mobile menu and logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Mobile menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((item) => (
              <li key={item.label}>
                <button
                  className="font-montserrat leading-normal text-lg text-black text-left w-full p-2 hover:bg-gray-100"
                  onClick={() => navigate(`/${item.href}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/${item.href}`)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <NavLink to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-coral-red">Ticket Flow</h1>
        </NavLink>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((item) => (
            <li key={item.label}>
              <button
                className="font-montserrat leading-normal text-lg text-black hover:bg-gray-100 px-4 py-2 rounded-lg"
                onClick={() => navigate(`/${item.href}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/${item.href}`)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User controls */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <button 
              tabIndex={0} 
              className="btn btn-ghost hover:bg-gray-200 transition-colors"
              aria-label="User menu"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{user.username || user.email}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button
                  className="justify-between hover:bg-gray-100"
                  onClick={() => navigate('/dashboard')}
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/dashboard')}
                >
                  {user.username} Dashboard
                </button>
              </li>
              <li>
                <button
                  className="hover:bg-gray-100 text-red-500"
                  onClick={logout}
                  onKeyDown={(e) => e.key === 'Enter' && logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <NavLink 
              className="btn bg-coral-red text-white hover:bg-coral-red/90 transition-colors" 
              to="/sign-in"
            >
              Log In
            </NavLink>
            <NavLink 
              className="btn btn-outline hover:bg-gray-200 transition-colors" 
              to="/sign-up"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;