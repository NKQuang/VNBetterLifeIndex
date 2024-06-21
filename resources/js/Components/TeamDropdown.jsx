import React, { useState } from 'react';

const TeamDropdown = ({ user, teams, currentTeam }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-indigo-500 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
      >
        {currentTeam.name}
        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>
            <a href={`/teams/${currentTeam.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Team Settings</a>
            {teams.length > 1 && (
              <>
                <div className="border-t border-gray-200"></div>
                <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>
                {teams.map((team) => (
                  <a key={team.id} href={`/teams/${team.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{team.name}</a>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDropdown;
