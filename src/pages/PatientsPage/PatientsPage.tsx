import { Search, LayoutGrid, List } from 'lucide-react';
import { usePatientStore } from '@/stores/patientStore';
import PatientCard from './PatientCard';
import PatientRow from './PatientRow';
import styles from './PatientsPage.module.css';

const STATUS_OPTIONS = ['All', 'Stable', 'Critical', 'Recovering', 'Discharged'] as const;

export default function PatientsPage() {
  const { viewMode, searchQuery, statusFilter, setViewMode, setSearchQuery, setStatusFilter, filteredPatients } =
    usePatientStore();

  const patients = filteredPatients();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>{patients.length} patients found</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name, ID, or condition…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {patients.length === 0 ? (
        <div className={styles.empty}>No patients match your filters.</div>
      ) : viewMode === 'grid' ? (
        <div className={styles.grid}>
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Patient</span>
            <span>ID</span>
            <span>Condition</span>
            <span>Doctor</span>
            <span>Room</span>
            <span>Status</span>
          </div>
          {patients.map((p) => (
            <PatientRow key={p.id} patient={p} />
          ))}
        </div>
      )}
    </div>
  );
}
