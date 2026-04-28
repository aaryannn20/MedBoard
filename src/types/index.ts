export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Stable' | 'Critical' | 'Recovering' | 'Discharged';
  admissionDate: string;
  doctor: string;
  room: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface AnalyticsData {
  monthlyAdmissions: { month: string; admissions: number; discharges: number }[];
  departmentLoad: { department: string; patients: number; capacity: number }[];
  patientsByStatus: { name: string; value: number }[];
  weeklyRevenue: { day: string; revenue: number }[];
}
