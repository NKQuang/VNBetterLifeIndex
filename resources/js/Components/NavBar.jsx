import React, { useState, useEffect } from 'react';
import TeamDropdown from './TeamDropdown';
import SettingsDropdown from './SettingsDropdown';

const Navbar = () => {
  const [open, setOpen] = useState(false);


  return (
    <nav className="bg-white border-b-2 border-gray-300 fixed top-0 inset-x-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <a href="/dashboard" className="text-xl font-bold text-gray-700 hover:text-indigo-500">
                VN BETTER LIFE
              </a>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <a href="/" className="text-gray-700 hover:text-indigo-500">
                Trang chủ
              </a>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">

          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={open ? 'hidden' : 'inline-flex'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={open ? 'inline-flex' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <a href="/" className="text-gray-700 hover:text-indigo-500 pt-5">
            Trang chủ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
