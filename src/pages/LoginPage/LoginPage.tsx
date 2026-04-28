import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Heart, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { signIn, error, loading, clearError, user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    try {
      await signIn(email, password);
    } catch {
      // error is set in store
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Heart size={32} />
          <span>MedBoard</span>
        </div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your healthcare dashboard</p>

        {error && (
          <div className={styles.error}>
            <AlertCircle size={16} />
            <span>{error}</span>
            <button onClick={clearError} className={styles.errorClose}>×</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                placeholder="you@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? <Loader2 size={20} className={styles.spinner} /> : 'Sign In'}
          </button>
        </form>

        <p className={styles.footer}>
          Demo: create an account in your Firebase console, then use those credentials here.
        </p>
      </div>
    </div>
  );
}
