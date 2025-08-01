import React from 'react';
import { Users, Building2, Calendar, DollarSign, TrendingUp, Award } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { mockEmployees, mockDepartments, mockLeaveRequests } from '../data/mockData';

export default function AdminDashboard() {
  const totalEmployees = mockEmployees.length;
  const totalDepartments = mockDepartments.length;
  const pendingLeaves = mockLeaveRequests.filter(req => req.status === 'pending').length;
  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);

  // Chart data for departments
  const departmentStats = mockDepartments.map(dept => ({
    name: dept.name,
    value: dept.employeeCount
  }));

  return (
    <div className="space-y-6">
    <div>
     {/* Page Header */} 
  <h1 className="text-3xl font-bold text-blue-700 mb-2">Admin Dashboard</h1>
  <p className="text-blue-500">Overview of your organization's key metrics</p>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          color="blue"
          trend={{ value: '+5.2%', isUp: true }}
        />
        <StatCard
          title="Departments"
          value={totalDepartments}
          icon={Building2}
          color="green"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves}
          icon={Calendar}
          color="orange"
        />
        <StatCard
          title="Monthly Payroll"
          value={`$${Math.round(totalPayroll / 12).toLocaleString()}`}
          icon={DollarSign}
          color="purple"
          trend={{ value: '+2.1%', isUp: true }}
        />
      </div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employees by Department</h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-700">{dept.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-24 h-2 rounded-full bg-gray-200 relative overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(dept.value / Math.max(...departmentStats.map(d => d.value))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{dept.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New employee Sarah Johnson joined IT department</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Leave request approved for Emily Chen</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Monthly payroll processed successfully</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all duration-200">
            <Users className="h-6 w-6 mb-2" />
            <p className="font-medium">Add New Employee</p>
            <p className="text-sm opacity-90">Onboard a new team member</p>
          </button>
          
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all duration-200">
            <Calendar className="h-6 w-6 mb-2" />
            <p className="font-medium">Review Leave Requests</p>
            <p className="text-sm opacity-90">{pendingLeaves} pending approvals</p>
          </button>
          
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all duration-200">
            <DollarSign className="h-6 w-6 mb-2" />
            <p className="font-medium">Process Payroll</p>
            <p className="text-sm opacity-90">Generate monthly reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}