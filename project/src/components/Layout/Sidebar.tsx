import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  ClipboardList,
  Menu,
  X,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminMenuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/employees', icon: Users, label: 'Employees' },
  { path: '/departments', icon: Building2, label: 'Departments' },
  { path: '/leave', icon: Calendar, label: 'Leave' },
  { path: '/payroll', icon: DollarSign, label: 'Payroll' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/weekly-requests', icon: ClipboardList, label: 'Weekly Requests' }
];

const employeeMenuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/leave', icon: Calendar, label: 'Leave' },
  { path: '/payroll', icon: DollarSign, label: 'Payroll Summary' },
  { path: '/weekly-requests', icon: ClipboardList, label: 'Weekly Request' },
  { path: '/profile', icon: UserIcon, label: 'Profile' }
];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = user?.role === 'admin' ? adminMenuItems : employeeMenuItems;

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-br from-blue-900 to-blue-800 text-white z-50 transition-transform duration-300 ${
        isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="text-xl font-bold">EMS Portal</h2>
                <p className="text-blue-300 text-sm">Employee Management</p>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`lg:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-lg shadow-lg ${
          !isCollapsed ? 'hidden' : ''
        }`}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}