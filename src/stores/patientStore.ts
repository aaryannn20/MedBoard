import { create } from 'zustand';
import type { Patient } from '@/types';
import { generatePatients } from '@/data/mock';

type ViewMode = 'grid' | 'list';

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  statusFilter: string;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  filteredPatients: () => Patient[];
}

const allPatients = generatePatients(24);

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: allPatients,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'All',

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  filteredPatients: () => {
    const { patients, searchQuery, statusFilter } = get();
    return patients.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  },
}));
