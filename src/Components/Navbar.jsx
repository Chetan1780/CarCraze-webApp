import { useUser, UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
      <img src="logo.svg" alt="logo" />
      <ul className='hidden md:flex gap-16'>
        <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'><Link to={'/'}>Home</Link></li>
        <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'><Link to={'/search'}>Search</Link></li>
        <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'><Link to={'/about'}>About Us</Link></li>
        {/* <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'>PreOwned</li> */}
      </ul>
      {isSignedIn ? (
        <div className='flex items-center gap-5'>
          <UserButton />
          {isHomePage && (
            <Link to={'./Profile'}>
              <Button>Submit Listing</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className='flex items-center gap-5'>
          <Link to={'/login'}>
            <Button>Login</Button>
          </Link>
          {isHomePage && (
            <Link to={'./Profile'}>
              <Button>Submit Listing</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
