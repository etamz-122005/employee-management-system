import React, { useState } from 'react';
import { Plus, Check, X, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { mockLeaveRequests, LeaveRequest, mockEmployees } from '../data/mockData';

export default function LeaveManagement() {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'vacation' as 'sick' | 'vacation' | 'personal' | 'emergency',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const currentEmployee = mockEmployees.find(emp => emp.email === user?.email);
  const userRequests = user?.role === 'admin' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.employeeId === currentEmployee?.id);

  const handleApprove = (requestId: string) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEmployee) return;

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newRequest: LeaveRequest = {
      id: `leave_${Date.now()}`,
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    setIsModalOpen(false);
    setFormData({
      type: 'vacation',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => (
        <span className="capitalize px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'days', label: 'Days' },
    { key: 'reason', label: 'Reason' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'approved' ? 'bg-green-100 text-green-800' :
          value === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'submittedAt', label: 'Submitted' }
  ];

  // Remove employee name column for employee view
  const employeeColumns = columns.filter(col => col.key !== 'employeeName');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Manage employee leave requests' : 'Your leave requests and balance'}
          </p>
        </div>
        {user?.role === 'employee' && (
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Request Leave
          </Button>
        )}
      </div>

      {/* Employee Leave Balance */}
      {user?.role === 'employee' && currentEmployee && (
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Leave Balance</h3>
              <p className="text-green-100">Available days for this year</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentEmployee.leaveBalance}</div>
              <p className="text-green-100">Days remaining</p>
            </div>
          </div>
        </div>
      )}

      {/* Leave Requests Table */}
      <Table
        columns={user?.role === 'admin' ? columns : employeeColumns}
        data={userRequests}
        actions={user?.role === 'admin' ? (request: LeaveRequest) => (
          request.status === 'pending' ? (
            <>
              <Button
                variant="success"
                size="sm"
                icon={Check}
                onClick={() => handleApprove(request.id)}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={X}
                onClick={() => handleReject(request.id)}
              >
                Reject
              </Button>
            </>
          ) : null
        ) : undefined}
      />

      {/* Request Leave Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Leave"
      >
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide a reason for your leave request..."
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" fullWidth>
              Submit Request
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              fullWidth
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}