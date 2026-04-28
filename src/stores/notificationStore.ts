import { create } from 'zustand';
import type { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: '1',
      title: 'Critical Alert',
      message: 'Patient PT-1003 vitals are abnormal. Immediate attention required.',
      timestamp: Date.now() - 300000,
      read: false,
      type: 'error',
    },
    {
      id: '2',
      title: 'New Admission',
      message: 'Patient Mary Johnson admitted to Cardiology, Room 302.',
      timestamp: Date.now() - 1800000,
      read: false,
      type: 'info',
    },
    {
      id: '3',
      title: 'Discharge Ready',
      message: 'Patient Robert Williams is cleared for discharge.',
      timestamp: Date.now() - 3600000,
      read: true,
      type: 'success',
    },
  ],

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          read: false,
        },
        ...state.notifications,
      ],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
