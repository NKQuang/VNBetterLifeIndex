import React, { useState } from 'react';

const SettingsDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
      >
        <img className="h-8 w-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="block px-4 py-2 text-xs text-gray-400">Manage Account</div>
            <a href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
            <form method="POST" action="/logout" className="block">
              <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Log Out</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
