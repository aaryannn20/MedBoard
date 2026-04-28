import type { Patient } from '@/types';
import { Phone, Mail, Calendar } from 'lucide-react';
import styles from './PatientsPage.module.css';

interface Props {
  patient: Patient;
}

export default function PatientCard({ patient }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <img src={patient.avatar} alt={patient.name} className={styles.cardAvatar} />
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{patient.name}</span>
          <span className={styles.cardId}>{patient.id}</span>
        </div>
        <span className={`${styles.badge} ${styles[`badge${patient.status}`]}`}>{patient.status}</span>
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <span className={styles.detailLabel}>Condition</span>
          <span className={styles.detailValue}>{patient.condition}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.detailLabel}>Doctor</span>
          <span className={styles.detailValue}>{patient.doctor}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.detailLabel}>Age / Gender</span>
          <span className={styles.detailValue}>{patient.age} · {patient.gender}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.detailLabel}>Room</span>
          <span className={styles.detailValue}>{patient.room}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.footerItem}><Phone size={13} /> {patient.phone}</span>
        <span className={styles.footerItem}><Mail size={13} /> {patient.email}</span>
        <span className={styles.footerItem}><Calendar size={13} /> {patient.admissionDate}</span>
      </div>
    </div>
  );
}
