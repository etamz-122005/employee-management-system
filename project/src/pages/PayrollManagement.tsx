import React, { useState } from 'react';
import { Download, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import StatCard from '../components/UI/StatCard';
import { mockPayrollRecords, mockEmployees, PayrollRecord } from '../data/mockData';

export default function PayrollManagement() {
  const { user } = useAuth();
  const [payrollRecords, setPayrollRecords] = useState(mockPayrollRecords);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');

  const currentEmployee = mockEmployees.find(emp => emp.email === user?.email);
  const userPayroll = user?.role === 'admin' 
    ? payrollRecords 
    : payrollRecords.filter(record => record.employeeId === currentEmployee?.id);

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);
  const averagePayroll = payrollRecords.length > 0 ? totalPayroll / payrollRecords.length : 0;

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    alert('Excel export functionality would be implemented here');
  };

  const handleUpdatePayroll = (recordId: string, field: string, value: number) => {
    setPayrollRecords(payrollRecords.map(record => {
      if (record.id === recordId) {
        const updatedRecord = { ...record, [field]: value };
        // Recalculate net pay
        updatedRecord.netPay = updatedRecord.baseSalary + updatedRecord.overtime + updatedRecord.bonus - updatedRecord.deductions;
        return updatedRecord;
      }
      return record;
    }));
  };

  const adminColumns = [
    { key: 'employeeName', label: 'Employee' },
    { 
      key: 'baseSalary', 
      label: 'Base Salary',
      render: (value: number, row: PayrollRecord) => (
        user?.role === 'admin' ? (
          <input
            type="number"
            value={value}
            onChange={(e) => handleUpdatePayroll(row.id, 'baseSalary', parseFloat(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        ) : (
          `$${value.toLocaleString()}`
        )
      )
    },
    { 
      key: 'overtime', 
      label: 'Overtime',
      render: (value: number, row: PayrollRecord) => (
        user?.role === 'admin' ? (
          <input
            type="number"
            value={value}
            onChange={(e) => handleUpdatePayroll(row.id, 'overtime', parseFloat(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        ) : (
          `$${value.toLocaleString()}`
        )
      )
    },
    { 
      key: 'bonus', 
      label: 'Bonus',
      render: (value: number, row: PayrollRecord) => (
        user?.role === 'admin' ? (
          <input
            type="number"
            value={value}
            onChange={(e) => handleUpdatePayroll(row.id, 'bonus', parseFloat(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        ) : (
          `$${value.toLocaleString()}`
        )
      )
    },
    { 
      key: 'deductions', 
      label: 'Deductions',
      render: (value: number, row: PayrollRecord) => (
        user?.role === 'admin' ? (
          <input
            type="number"
            value={value}
            onChange={(e) => handleUpdatePayroll(row.id, 'deductions', parseFloat(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        ) : (
          `$${value.toLocaleString()}`
        )
      )
    },
    { 
      key: 'netPay', 
      label: 'Net Pay',
      render: (value: number) => (
        <span className="font-semibold text-green-600">${value.toLocaleString()}</span>
      )
    },
    { key: 'payPeriod', label: 'Pay Period' }
  ];

  const employeeColumns = adminColumns.filter(col => col.key !== 'employeeName');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.role === 'admin' ? 'Payroll Management' : 'Payroll Summary'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Manage employee payroll and compensation' : 'Your salary and payment details'}
          </p>
        </div>
        {user?.role === 'admin' && (
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              icon={Download}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
            <Button
              variant="secondary"
              icon={Download}
              onClick={handleExportExcel}
            >
              Export Excel
            </Button>
          </div>
        )}
      </div>

      {/* Stats for Admin */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Payroll"
            value={`$${totalPayroll.toLocaleString()}`}
            icon={DollarSign}
            color="green"
            trend={{ value: '+3.2%', isUp: true }}
          />
          <StatCard
            title="Average Salary"
            value={`$${Math.round(averagePayroll).toLocaleString()}`}
            icon={TrendingUp}
            color="blue"
          />
          <StatCard
            title="Employees Paid"
            value={payrollRecords.length}
            icon={Calculator}
            color="purple"
          />
        </div>
      )}

      {/* Employee Personal Stats */}
      {user?.role === 'employee' && currentEmployee && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Annual Salary</h3>
              <p className="text-2xl font-bold">${currentEmployee.salary.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Monthly Gross</h3>
              <p className="text-2xl font-bold">${Math.round(currentEmployee.salary / 12).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Hours/Month</h3>
              <p className="text-2xl font-bold">{currentEmployee.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* Period Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Pay Period:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="2024-01">January 2024</option>
            <option value="2023-12">December 2023</option>
            <option value="2023-11">November 2023</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <Table
        columns={user?.role === 'admin' ? adminColumns : employeeColumns}
        data={userPayroll.filter(record => record.payPeriod === selectedPeriod)}
      />

      {/* Admin Instructions */}
      {user?.role === 'admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Payroll Management Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click on any salary field to edit amounts directly</li>
            <li>• Net pay is automatically calculated when you update values</li>
            <li>• Use export buttons to generate reports for accounting</li>
            <li>• Changes are saved automatically</li>
          </ul>
        </div>
      )}
    </div>
  );
}