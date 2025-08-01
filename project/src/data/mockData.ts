import { Employee, Department, Position, LeaveRequest, WeeklyRequest, PayrollRecord } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'emp_001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'Software Engineer',
    department: 'IT',
    salary: 75000,
    hours: 160,
    joinDate: '2023-01-15',
    status: 'active',
    leaveBalance: 15
  },
  {
    id: 'emp_002',
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    salary: 68000,
    hours: 160,
    joinDate: '2022-08-20',
    status: 'active',
    leaveBalance: 12
  },
  {
    id: 'emp_003',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    position: 'HR Specialist',
    department: 'HR',
    salary: 55000,
    hours: 160,
    joinDate: '2023-03-10',
    status: 'active',
    leaveBalance: 18
  },
  {
    id: 'emp_004',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    position: 'Financial Analyst',
    department: 'Finance',
    salary: 62000,
    hours: 160,
    joinDate: '2022-11-05',
    status: 'active',
    leaveBalance: 10
  },
  {
    id: 'emp_005',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    position: 'UX Designer',
    department: 'IT',
    salary: 70000,
    hours: 160,
    joinDate: '2023-02-28',
    status: 'active',
    leaveBalance: 14
  },
  {
    id: 'emp_006',
    name: 'James Brown',
    email: 'james.brown@company.com',
    position: 'Operations Manager',
    department: 'Logistics',
    salary: 72000,
    hours: 160,
    joinDate: '2022-06-15',
    status: 'active',
    leaveBalance: 8
  },
  {
    id: 'emp_007',
    name: 'Anna Taylor',
    email: 'anna.taylor@company.com',
    position: 'Content Writer',
    department: 'Marketing',
    salary: 48000,
    hours: 160,
    joinDate: '2023-04-12',
    status: 'active',
    leaveBalance: 20
  },
  {
    id: 'emp_008',
    name: 'Robert Miller',
    email: 'robert.miller@company.com',
    position: 'DevOps Engineer',
    department: 'IT',
    salary: 80000,
    hours: 160,
    joinDate: '2022-09-30',
    status: 'active',
    leaveBalance: 11
  },
  {
    id: 'emp_009',
    name: 'Jennifer White',
    email: 'jennifer.white@company.com',
    position: 'Accountant',
    department: 'Finance',
    salary: 58000,
    hours: 160,
    joinDate: '2023-01-08',
    status: 'active',
    leaveBalance: 16
  },
  {
    id: 'emp_010',
    name: 'Kevin Garcia',
    email: 'kevin.garcia@company.com',
    position: 'Sales Representative',
    department: 'Marketing',
    salary: 52000,
    hours: 160,
    joinDate: '2022-12-20',
    status: 'active',
    leaveBalance: 13
  },
  {
    id: 'emp_011',
    name: 'Maria Martinez',
    email: 'maria.martinez@company.com',
    position: 'Project Manager',
    department: 'IT',
    salary: 78000,
    hours: 160,
    joinDate: '2022-05-18',
    status: 'active',
    leaveBalance: 9
  },
  {
    id: 'emp_012',
    name: 'Thomas Anderson',
    email: 'thomas.anderson@company.com',
    position: 'Warehouse Supervisor',
    department: 'Logistics',
    salary: 55000,
    hours: 160,
    joinDate: '2023-03-25',
    status: 'active',
    leaveBalance: 17
  },
  {
    id: 'emp_013',
    name: 'Amanda Clark',
    email: 'amanda.clark@company.com',
    position: 'Training Coordinator',
    department: 'HR',
    salary: 50000,
    hours: 160,
    joinDate: '2022-10-14',
    status: 'active',
    leaveBalance: 19
  },
  {
    id: 'emp_014',
    name: 'Christopher Lee',
    email: 'christopher.lee@company.com',
    position: 'Quality Analyst',
    department: 'IT',
    salary: 65000,
    hours: 160,
    joinDate: '2023-02-03',
    status: 'active',
    leaveBalance: 12
  },
  {
    id: 'emp_015',
    name: 'Nicole Turner',
    email: 'nicole.turner@company.com',
    position: 'Customer Service Manager',
    department: 'Marketing',
    salary: 60000,
    hours: 160,
    joinDate: '2022-07-22',
    status: 'active',
    leaveBalance: 15
  }
];

export const mockDepartments: Department[] = [
  {
    id: 'dept_001',
    name: 'IT',
    manager: 'Maria Martinez',
    employeeCount: 5
  },
  {
    id: 'dept_002',
    name: 'Marketing',
    manager: 'Mike Davis',
    employeeCount: 4
  },
  {
    id: 'dept_003',
    name: 'HR',
    manager: 'Emily Chen',
    employeeCount: 2
  },
  {
    id: 'dept_004',
    name: 'Finance',
    manager: 'David Wilson',
    employeeCount: 2
  },
  {
    id: 'dept_005',
    name: 'Logistics',
    manager: 'James Brown',
    employeeCount: 2
  }
];

export const mockPositions: Position[] = [
  { id: 'pos_001', title: 'Software Engineer', department: 'IT', level: 'Mid' },
  { id: 'pos_002', title: 'DevOps Engineer', department: 'IT', level: 'Senior' },
  { id: 'pos_003', title: 'UX Designer', department: 'IT', level: 'Mid' },
  { id: 'pos_004', title: 'Project Manager', department: 'IT', level: 'Senior' },
  { id: 'pos_005', title: 'Quality Analyst', department: 'IT', level: 'Junior' },
  { id: 'pos_006', title: 'Marketing Manager', department: 'Marketing', level: 'Senior' },
  { id: 'pos_007', title: 'Content Writer', department: 'Marketing', level: 'Junior' },
  { id: 'pos_008', title: 'Sales Representative', department: 'Marketing', level: 'Mid' },
  { id: 'pos_009', title: 'Customer Service Manager', department: 'Marketing', level: 'Senior' },
  { id: 'pos_010', title: 'HR Specialist', department: 'HR', level: 'Mid' },
  { id: 'pos_011', title: 'Training Coordinator', department: 'HR', level: 'Junior' },
  { id: 'pos_012', title: 'Financial Analyst', department: 'Finance', level: 'Mid' },
  { id: 'pos_013', title: 'Accountant', department: 'Finance', level: 'Junior' },
  { id: 'pos_014', title: 'Operations Manager', department: 'Logistics', level: 'Senior' },
  { id: 'pos_015', title: 'Warehouse Supervisor', department: 'Logistics', level: 'Mid' }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave_001',
    employeeId: 'emp_001',
    employeeName: 'Sarah Johnson',
    type: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-19',
    days: 5,
    reason: 'Family vacation',
    status: 'approved',
    submittedAt: '2024-01-20'
  },
  {
    id: 'leave_002',
    employeeId: 'emp_003',
    employeeName: 'Emily Chen',
    type: 'sick',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    days: 3,
    reason: 'Flu symptoms',
    status: 'pending',
    submittedAt: '2024-02-09'
  },
  {
    id: 'leave_003',
    employeeId: 'emp_005',
    employeeName: 'Lisa Rodriguez',
    type: 'personal',
    startDate: '2024-02-20',
    endDate: '2024-02-20',
    days: 1,
    reason: 'Personal appointment',
    status: 'approved',
    submittedAt: '2024-02-05'
  }
];

export const mockWeeklyRequests: WeeklyRequest[] = [
  {
    id: 'weekly_001',
    employeeId: 'emp_001',
    employeeName: 'Sarah Johnson',
    week: '2024-W06',
    purpose: 'Sprint planning and development tasks',
    email: 'sarah.johnson@company.com',
    submittedAt: '2024-02-09',
    status: 'approved'
  },
  {
    id: 'weekly_002',
    employeeId: 'emp_002',
    employeeName: 'Mike Davis',
    week: '2024-W06',
    purpose: 'Marketing campaign review and strategy',
    email: 'mike.davis@company.com',
    submittedAt: '2024-02-08',
    status: 'pending'
  }
];

export const mockPayrollRecords: PayrollRecord[] = [
  {
    id: 'pay_001',
    employeeId: 'emp_001',
    employeeName: 'Sarah Johnson',
    baseSalary: 6250,
    overtime: 500,
    bonus: 0,
    deductions: 1200,
    netPay: 5550,
    payPeriod: '2024-01'
  },
  {
    id: 'pay_002',
    employeeId: 'emp_002',
    employeeName: 'Mike Davis',
    baseSalary: 5667,
    overtime: 200,
    bonus: 1000,
    deductions: 1100,
    netPay: 5767,
    payPeriod: '2024-01'
  }
];