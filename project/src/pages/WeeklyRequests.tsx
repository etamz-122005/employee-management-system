import React, { useState } from 'react';
import { Plus, Send, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { mockWeeklyRequests, WeeklyRequest, mockEmployees } from '../data/mockData';

export default function WeeklyRequests() {
  const { user } = useAuth();
  const [weeklyRequests, setWeeklyRequests] = useState(mockWeeklyRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    week: '',
    purpose: '',
    email: ''
  });

  const currentEmployee = mockEmployees.find(emp => emp.email === user?.email);
  const userRequests = user?.role === 'admin' 
    ? weeklyRequests 
    : weeklyRequests.filter(req => req.employeeId === currentEmployee?.id);

  const handleApprove = (requestId: string) => {
    setWeeklyRequests(weeklyRequests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (requestId: string) => {
    setWeeklyRequests(weeklyRequests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEmployee) return;

    const newRequest: WeeklyRequest = {
      id: `weekly_${Date.now()}`,
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      week: formData.week,
      purpose: formData.purpose,
      email: formData.email || currentEmployee.email,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setWeeklyRequests([...weeklyRequests, newRequest]);
    setIsModalOpen(false);
    setFormData({
      week: '',
      purpose: '',
      email: ''
    });
  };

  // Get current week in YYYY-Www format
  const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = Math.ceil(((now.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'week', label: 'Week' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'email', label: 'Email' },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Reports</h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Manage weekly report submissions' : 'Submit and track your weekly reports'}
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setFormData({
              week: getCurrentWeek(),
              purpose: '',
              email: currentEmployee?.email || ''
            });
            setIsModalOpen(true);
          }}
        >
          {user?.role === 'admin' ? 'Add Request' : 'Submit Weekly Report'}
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{userRequests.length}</p>
            </div>
            <div className="p-3 rounded-xl border bg-blue-50 text-blue-600 border-blue-200">
              <Send className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">
                {userRequests.filter(req => req.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-xl border bg-orange-50 text-orange-600 border-orange-200">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-gray-900">
                {userRequests.filter(req => req.status === 'approved').length}
              </p>
            </div>
            <div className="p-3 rounded-xl border bg-green-50 text-green-600 border-green-200">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Requests Table */}
      <Table
        columns={user?.role === 'admin' ? columns : employeeColumns}
        data={userRequests}
        actions={user?.role === 'admin' ? (request: WeeklyRequest) => (
          request.status === 'pending' ? (
            <>
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle}
                onClick={() => handleApprove(request.id)}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Clock}
                onClick={() => handleReject(request.id)}
              >
                Reject
              </Button>
            </>
          ) : null
        ) : undefined}
      />

      {/* Submit Weekly Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Weekly Report"
      >
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
            <input
              type="week"
              value={formData.week}
              onChange={(e) => setFormData({...formData, week: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose/Summary</label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your weekly activities, achievements, and goals..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email address"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Weekly Report Guidelines:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Summarize key accomplishments and tasks completed</li>
              <li>• Mention any challenges faced and how they were resolved</li>
              <li>• Outline goals and priorities for the upcoming week</li>
              <li>• Include any support or resources needed</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" fullWidth icon={Send}>
              Submit Report
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