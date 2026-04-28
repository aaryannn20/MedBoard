import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, Users, Bell, LogOut, Menu, X, Heart,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import styles from './AppLayout.module.css';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/patients', icon: Users, label: 'Patients' },
];

export default function AppLayout() {
  const { user, signOut } = useAuthStore();
  const { notifications, unreadCount, markAllRead } = useNotificationStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <Heart size={24} />
          <span>MedBoard</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
              onClick={() => setSidebarOpen(false)}
              end={to === '/'}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className={styles.signOut} onClick={handleSignOut}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>

          <div className={styles.topRight}>
            {/* Notifications */}
            <div className={styles.notifWrap} ref={notifRef}>
              <button className={styles.notifBtn} onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
                <Bell size={18} />
                {unreadCount() > 0 && <span className={styles.notifBadge}>{unreadCount()}</span>}
              </button>

              {notifOpen && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>
                    <span>Notifications</span>
                    <button onClick={markAllRead} className={styles.markAll}>Mark all read</button>
                  </div>
                  <div className={styles.notifList}>
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}>
                        <div className={`${styles.notifDot} ${styles[`dot${n.type}`]}`} />
                        <div>
                          <span className={styles.notifTitle}>{n.title}</span>
                          <span className={styles.notifMsg}>{n.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User avatar */}
            <div className={styles.userPill}>
              <div className={styles.avatar}>{user?.email?.[0]?.toUpperCase() ?? 'U'}</div>
              <span className={styles.userEmail}>{user?.email ?? 'user@hospital.com'}</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
