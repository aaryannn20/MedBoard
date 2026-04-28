import type { Patient } from '@/types';
import styles from './PatientsPage.module.css';

interface Props {
  patient: Patient;
}

export default function PatientRow({ patient }: Props) {
  return (
    <div className={styles.tableRow}>
      <span className={styles.rowPatient}>
        <img src={patient.avatar} alt={patient.name} className={styles.rowAvatar} />
        <span>
          <span className={styles.rowName}>{patient.name}</span>
          <span className={styles.rowAge}>{patient.age}y · {patient.gender}</span>
        </span>
      </span>
      <span className={styles.rowCell}>{patient.id}</span>
      <span className={styles.rowCell}>{patient.condition}</span>
      <span className={styles.rowCell}>{patient.doctor}</span>
      <span className={styles.rowCell}>{patient.room}</span>
      <span><span className={`${styles.badge} ${styles[`badge${patient.status}`]}`}>{patient.status}</span></span>
    </div>
  );
}
