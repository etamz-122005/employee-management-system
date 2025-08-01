import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
 <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-sm border-b border-blue-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome {user?.role === 'admin' ? 'Admin' : ''} {user?.name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {user?.role === 'admin' ? 'System Administrator' : 'Employee Portal'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}