import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Heart, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { signIn, signUp, error, loading, clearError, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
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
        <h1 className={styles.title}>{isSignUp ? 'Create account' : 'Welcome back'}</h1>
        <p className={styles.subtitle}>{isSignUp ? 'Sign up for your healthcare dashboard' : 'Sign in to your healthcare dashboard'}</p>
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
            {loading ? <Loader2 size={20} className={styles.spinner} /> : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className={styles.footer}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '} 
          <button type="button" className={styles.toggleAuth} onClick={() => { setIsSignUp(!isSignUp); clearError(); }} > {isSignUp ? 'Sign In' : 'Sign Up'} </button>
        </p>
      </div>
    </div>
  );
}
