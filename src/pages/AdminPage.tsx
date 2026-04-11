import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AdminDashboard from '../components/AdminDashboard';

const ADMIN_EMAIL = 'ericapple2021@gmail.com';

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u || u.email !== ADMIN_EMAIL) {
        navigate('/');
      }
    });
    return () => unsub();
  }, [navigate]);

  return <AdminDashboard onClose={() => navigate('/')} />;
}

// MJ Commit
