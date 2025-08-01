import React from 'react';
import { Clock, Calendar, DollarSign, FileText, Plus, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/UI/StatCard';
import Button from '../components/UI/Button';
import { mockEmployees, mockLeaveRequests, mockPayrollRecords } from '../data/mockData';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  // Find current employee data
  const currentEmployee = mockEmployees.find(emp => emp.email === user?.email);
  const leaveBalance = currentEmployee?.leaveBalance || 0;
  const estimatedPay = currentEmployee ? Math.round(currentEmployee.salary / 12) : 0;
  const hoursWorked = currentEmployee?.hours || 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Your personal workspace and quick actions</p>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Monthly Hours"
          value={hoursWorked}
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Leave Balance"
          value={`${leaveBalance} days`}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Estimated Pay"
          value={`$${estimatedPay.toLocaleString()}`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            icon={Plus}
            fullWidth
            onClick={() => window.location.href = '/leave'}
          >
            Request Leave
          </Button>
          <Button
            variant="secondary"
            icon={Send}
            fullWidth
            onClick={() => window.location.href = '/weekly-requests'}
          >
            Submit Weekly Report
          </Button>
        </div>
      </div>

      {/* Employee Info Card */}
      {currentEmployee && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Employee Profile</h3>
              <div className="space-y-2 text-blue-100">
                <p><span className="font-medium">Position:</span> {currentEmployee.position}</p>
                <p><span className="font-medium">Department:</span> {currentEmployee.department}</p>
                <p><span className="font-medium">Employee ID:</span> {currentEmployee.id}</p>
                <p><span className="font-medium">Join Date:</span> {new Date(currentEmployee.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FileText className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
          <div className="space-y-3">
            {mockLeaveRequests
              .filter(req => req.employeeId === currentEmployee?.id)
              .slice(0, 3)
              .map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{request.type} Leave</p>
                    <p className="text-sm text-gray-600">{request.startDate} - {request.endDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))}
            {mockLeaveRequests.filter(req => req.employeeId === currentEmployee?.id).length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent leave requests</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Team Meeting</p>
                <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Project Deadline</p>
                <p className="text-sm text-gray-600">Friday, Feb 16</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Performance Review</p>
                <p className="text-sm text-gray-600">Next Monday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}