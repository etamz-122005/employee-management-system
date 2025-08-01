export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  employeeId?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  hours: number;
  joinDate: string;
  status: 'active' | 'inactive';
  leaveBalance: number;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
}

export interface Position {
  id: string;
  title: string;
  department: string;
  level: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface WeeklyRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  week: string;
  purpose: string;
  email: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  netPay: number;
  payPeriod: string;
}