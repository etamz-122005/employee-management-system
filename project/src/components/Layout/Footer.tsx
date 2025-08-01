import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black-50 border-t border-black-200 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © 2024 Employee Management System. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">Version 1.0.0</p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}