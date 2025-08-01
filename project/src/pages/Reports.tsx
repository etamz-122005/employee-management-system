import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart, Users, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import StatCard from '../components/UI/StatCard';
import { mockEmployees, mockDepartments, mockLeaveRequests, mockPayrollRecords } from '../data/mockData';

export default function Reports() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState<'department' | 'leave' | 'payroll'>('department');

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const departmentStats = mockDepartments.map(dept => ({
    name: dept.name,
    employees: mockEmployees.filter(emp => emp.department === dept.name).length,
    totalSalary: mockEmployees
      .filter(emp => emp.department === dept.name)
      .reduce((sum, emp) => sum + emp.salary, 0)
  }));

  const leaveStats = {
    total: mockLeaveRequests.length,
    approved: mockLeaveRequests.filter(req => req.status === 'approved').length,
    pending: mockLeaveRequests.filter(req => req.status === 'pending').length,
    rejected: mockLeaveRequests.filter(req => req.status === 'rejected').length
  };

  const payrollStats = {
    totalPayroll: mockPayrollRecords.reduce((sum, record) => sum + record.netPay, 0),
    averageSalary: mockEmployees.reduce((sum, emp) => sum + emp.salary, 0) / mockEmployees.length,
    highestPaid: Math.max(...mockEmployees.map(emp => emp.salary)),
    lowestPaid: Math.min(...mockEmployees.map(emp => emp.salary))
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  };

  const generateReport = () => {
    alert(`Generating ${selectedReport} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive organizational reports</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => handleExport('excel')}
          >
            Export Excel
          </Button>
          <Button
            variant="primary"
            icon={FileText}
            onClick={generateReport}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Report Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedReport('department')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedReport === 'department'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <BarChart3 className={`h-8 w-8 mx-auto mb-2 ${
              selectedReport === 'department' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h4 className="font-medium text-gray-900">Department Report</h4>
            <p className="text-sm text-gray-600">Employee distribution by department</p>
          </button>

          <button
            onClick={() => setSelectedReport('leave')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedReport === 'leave'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Calendar className={`h-8 w-8 mx-auto mb-2 ${
              selectedReport === 'leave' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h4 className="font-medium text-gray-900">Leave Summary</h4>
            <p className="text-sm text-gray-600">Leave requests and balances</p>
          </button>

          <button
            onClick={() => setSelectedReport('payroll')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedReport === 'payroll'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <PieChart className={`h-8 w-8 mx-auto mb-2 ${
              selectedReport === 'payroll' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h4 className="font-medium text-gray-900">Payroll Report</h4>
            <p className="text-sm text-gray-600">Salary and compensation analysis</p>
          </button>
        </div>
      </div>

      {/* Report Content */}
      {selectedReport === 'department' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Total Departments"
              value={mockDepartments.length}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Total Employees"
              value={mockEmployees.length}
              icon={Users}
              color="green"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h3>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{dept.name}</h4>
                      <p className="text-sm text-gray-600">{dept.employees} employees</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${dept.totalSalary.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total salary</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'leave' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Requests"
              value={leaveStats.total}
              icon={Calendar}
              color="blue"
            />
            <StatCard
              title="Approved"
              value={leaveStats.approved}
              icon={Calendar}
              color="green"
            />
            <StatCard
              title="Pending"
              value={leaveStats.pending}
              icon={Calendar}
              color="orange"
            />
            <StatCard
              title="Rejected"
              value={leaveStats.rejected}
              icon={Calendar}
              color="red"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Request Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">By Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Approved</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(leaveStats.approved / leaveStats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{leaveStats.approved}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(leaveStats.pending / leaveStats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{leaveStats.pending}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rejected</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${(leaveStats.rejected / leaveStats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{leaveStats.rejected}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'payroll' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Payroll"
              value={`$${payrollStats.totalPayroll.toLocaleString()}`}
              icon={PieChart}
              color="green"
            />
            <StatCard
              title="Average Salary"
              value={`$${Math.round(payrollStats.averageSalary).toLocaleString()}`}
              icon={BarChart3}
              color="blue"
            />
            <StatCard
              title="Highest Paid"
              value={`$${payrollStats.highestPaid.toLocaleString()}`}
              icon={BarChart3}
              color="purple"
            />
            <StatCard
              title="Lowest Paid"
              value={`$${payrollStats.lowestPaid.toLocaleString()}`}
              icon={BarChart3}
              color="orange"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Distribution by Department</h3>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{dept.name}</h4>
                      <p className="text-sm text-gray-600">
                        Avg: ${Math.round(dept.totalSalary / dept.employees).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${dept.totalSalary.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total budget</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}