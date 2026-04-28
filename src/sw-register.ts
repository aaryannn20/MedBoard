export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[SW] Registered:', reg.scope);

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            showWelcomeNotification(reg);
          }
        } else if (Notification.permission === 'granted') {
          showWelcomeNotification(reg);
        }
      } catch (err) {
        console.log('[SW] Registration failed:', err);
      }
    });
  }
}

function showWelcomeNotification(reg: ServiceWorkerRegistration) {
  // Delay slightly so SW is active
  setTimeout(() => {
    reg.showNotification('MedBoard Alert', {
      body: 'You have 2 unread alerts. Patient PT-1003 requires immediate attention.',
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'welcome',
      data: { url: '/patients' },
    });
  }, 3000);
}
