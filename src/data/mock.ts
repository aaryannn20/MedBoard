import type { Patient, AnalyticsData } from '@/types';

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const conditions = ['Hypertension', 'Type 2 Diabetes', 'Pneumonia', 'Fracture — Left Arm', 'Post-Op Recovery', 'Cardiac Arrhythmia', 'Asthma Exacerbation', 'Chronic Back Pain', 'Migraine', 'Appendicitis', 'Bronchitis', 'Anemia'];
const statuses: Patient['status'][] = ['Stable', 'Critical', 'Recovering', 'Discharged'];
const doctors = ['Dr. A. Patel', 'Dr. S. Kim', 'Dr. R. Chen', 'Dr. M. Okafor', 'Dr. L. Rivera', 'Dr. J. Müller'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function generatePatients(count = 24): Patient[] {
  return Array.from({ length: count }, (_, i) => {
    const first = randomFrom(firstNames);
    const last = randomFrom(lastNames);
    const gender = randomFrom<Patient['gender']>(['Male', 'Female', 'Other']);
    const age = 18 + Math.floor(Math.random() * 72);
    return {
      id: `PT-${String(1000 + i)}`,
      name: `${first} ${last}`,
      age,
      gender,
      condition: randomFrom(conditions),
      status: randomFrom(statuses),
      admissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().slice(0, 10),
      doctor: randomFrom(doctors),
      room: `${Math.floor(Math.random() * 5) + 1}${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
      phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@email.com`,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${first}+${last}&backgroundColor=0ea5e9,6366f1,8b5cf6,ec4899,f97316&backgroundType=gradientLinear`,
    };
  });
}

export function generateAnalytics(): AnalyticsData {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    monthlyAdmissions: months.map((month) => ({
      month,
      admissions: 40 + Math.floor(Math.random() * 60),
      discharges: 35 + Math.floor(Math.random() * 55),
    })),
    departmentLoad: [
      { department: 'Cardiology', patients: 28, capacity: 40 },
      { department: 'Neurology', patients: 18, capacity: 30 },
      { department: 'Orthopedics', patients: 34, capacity: 35 },
      { department: 'Pediatrics', patients: 22, capacity: 45 },
      { department: 'Oncology', patients: 15, capacity: 25 },
      { department: 'Emergency', patients: 42, capacity: 50 },
    ],
    patientsByStatus: [
      { name: 'Stable', value: 45 },
      { name: 'Critical', value: 12 },
      { name: 'Recovering', value: 28 },
      { name: 'Discharged', value: 15 },
    ],
    weeklyRevenue: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
      day,
      revenue: 8000 + Math.floor(Math.random() * 12000),
    })),
  };
}

// Pre-generated stable instance so data doesn't change on re-mount
export const analyticsData: AnalyticsData = generateAnalytics();
