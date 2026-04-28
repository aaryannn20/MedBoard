import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  RadialBarChart, RadialBar,
} from 'recharts';
import { analyticsData } from '@/data/mock';
import styles from './AnalyticsPage.module.css';

const COLORS = ['#22c55e', '#ef4444', '#eab308', '#94a3b8'];
const DEPT_COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#ef4444'];

export default function AnalyticsPage() {
  const data = useMemo(() => analyticsData, []);

  const radialData = data.departmentLoad.map((d, i) => ({
    name: d.department,
    occupancy: Math.round((d.patients / d.capacity) * 100),
    fill: DEPT_COLORS[i % DEPT_COLORS.length],
  }));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>Facility performance and patient insights</p>
      </div>

      <div className={styles.grid}>
        {/* Monthly Admissions Bar Chart */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Monthly Admissions vs Discharges</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyAdmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
              <Bar dataKey="admissions" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="discharges" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Status Pie */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Patients by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.patientsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {data.patientsByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span style={{ color: 'var(--text)', fontSize: '0.8125rem' }}>{value}</span>}
              />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Revenue Line Chart */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Occupancy Radial */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Department Occupancy %</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              data={radialData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="occupancy" cornerRadius={6} background={{ fill: 'var(--bg)' }} />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                formatter={(value) => <span style={{ color: 'var(--text)', fontSize: '0.75rem' }}>{value}</span>}
              />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
