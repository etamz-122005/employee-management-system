import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { mockDepartments, mockPositions, Department, Position } from '../data/mockData';

export default function DepartmentManagement() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'departments' | 'positions'>('departments');
  const [departments, setDepartments] = useState(mockDepartments);
  const [positions, setPositions] = useState(mockPositions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Department | Position | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    title: '',
    department: '',
    level: ''
  });

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      manager: '',
      title: '',
      department: '',
      level: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Department | Position) => {
    setEditingItem(item);
    if ('manager' in item) {
      // Department
      setFormData({
        name: item.name,
        manager: item.manager,
        title: '',
        department: '',
        level: ''
      });
    } else {
      // Position
      setFormData({
        name: '',
        manager: '',
        title: item.title,
        department: item.department,
        level: item.level
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'departments') {
        setDepartments(departments.filter(dept => dept.id !== id));
      } else {
        setPositions(positions.filter(pos => pos.id !== id));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'departments') {
      if (editingItem && 'manager' in editingItem) {
        setDepartments(departments.map(dept => 
          dept.id === editingItem.id 
            ? { ...dept, name: formData.name, manager: formData.manager }
            : dept
        ));
      } else {
        const newDepartment: Department = {
          id: `dept_${Date.now()}`,
          name: formData.name,
          manager: formData.manager,
          employeeCount: 0
        };
        setDepartments([...departments, newDepartment]);
      }
    } else {
      if (editingItem && 'title' in editingItem) {
        setPositions(positions.map(pos => 
          pos.id === editingItem.id 
            ? { ...pos, title: formData.title, department: formData.department, level: formData.level }
            : pos
        ));
      } else {
        const newPosition: Position = {
          id: `pos_${Date.now()}`,
          title: formData.title,
          department: formData.department,
          level: formData.level
        };
        setPositions([...positions, newPosition]);
      }
    }
    
    setIsModalOpen(false);
  };

  const departmentColumns = [
    { key: 'name', label: 'Department Name' },
    { key: 'manager', label: 'Manager' },
    { key: 'employeeCount', label: 'Employee Count' }
  ];

  const positionColumns = [
    { key: 'title', label: 'Position Title' },
    { key: 'department', label: 'Department' },
    { key: 'level', label: 'Level' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Department & Position Management</h1>
          <p className="text-gray-600">Manage organizational structure</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleAdd}
        >
          Add {activeTab === 'departments' ? 'Department' : 'Position'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('departments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'departments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Departments</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'positions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Positions</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'departments' ? (
            <Table
              columns={departmentColumns}
              data={departments}
              actions={(department: Department) => (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Edit}
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(department.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            />
          ) : (
            <Table
              columns={positionColumns}
              data={positions}
              actions={(position: Position) => (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Edit}
                    onClick={() => handleEdit(position)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(position.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            />
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editingItem ? 'Edit' : 'Add'} ${activeTab === 'departments' ? 'Department' : 'Position'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'departments' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" fullWidth>
              {editingItem ? 'Update' : 'Add'} {activeTab === 'departments' ? 'Department' : 'Position'}
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