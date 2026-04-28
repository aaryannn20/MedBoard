import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, BedDouble, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePatientStore } from '@/stores/patientStore';
import { analyticsData } from '@/data/mock';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const patients = usePatientStore((s) => s.patients);
  const analytics = useMemo(() => analyticsData, []);

  const stats = useMemo(() => {
    const critical = patients.filter((p) => p.status === 'Critical').length;
    const stable = patients.filter((p) => p.status === 'Stable').length;
    const recovering = patients.filter((p) => p.status === 'Recovering').length;
    return { total: patients.length, critical, stable, recovering };
  }, [patients]);

  const cards = [
    { label: 'Total Patients', value: stats.total, icon: Users, color: '#0ea5e9', change: '+12%' },
    { label: 'Critical', value: stats.critical, icon: AlertTriangle, color: '#ef4444', change: '-3%' },
    { label: 'Stable', value: stats.stable, icon: Activity, color: '#22c55e', change: '+8%' },
    { label: 'Beds Occupied', value: stats.total - patients.filter((p) => p.status === 'Discharged').length, icon: BedDouble, color: '#8b5cf6', change: '+5%' },
  ];

  const recentPatients = patients.slice(0, 6);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Overview of your healthcare facility</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>{card.label}</span>
              <div className={styles.statIcon} style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                <card.icon size={18} />
              </div>
            </div>
            <div className={styles.statValue}>{card.value}</div>
            <div className={styles.statChange}>
              <TrendingUp size={14} />
              <span style={{ color: card.change.startsWith('+') ? '#22c55e' : '#ef4444' }}>
                {card.change}
              </span>
              <span className={styles.statPeriod}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Admissions & Discharges</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analytics.monthlyAdmissions}>
              <defs>
                <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="disGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
              <Area type="monotone" dataKey="admissions" stroke="#0ea5e9" fillOpacity={1} fill="url(#admGrad)" />
              <Area type="monotone" dataKey="discharges" stroke="#8b5cf6" fillOpacity={1} fill="url(#disGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.chartTitle}>Recent Patients</h3>
            <Link to="/patients" className={styles.viewAll}>View all <ArrowUpRight size={14} /></Link>
          </div>
          <div className={styles.recentList}>
            {recentPatients.map((p) => (
              <div key={p.id} className={styles.recentItem}>
                <img src={p.avatar} alt={p.name} className={styles.recentAvatar} />
                <div className={styles.recentInfo}>
                  <span className={styles.recentName}>{p.name}</span>
                  <span className={styles.recentCondition}>{p.condition}</span>
                </div>
                <span className={`${styles.badge} ${styles[`badge${p.status}`]}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
