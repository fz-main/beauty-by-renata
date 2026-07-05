import React, { useState, useEffect } from 'react';

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  booking_date: string;
  start_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#facc15',
  confirmed: '#4ade80',
  cancelled: '#f87171',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Čeká',
  confirmed: 'Potvrzena',
  cancelled: 'Zrušena',
};

export const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    if (localStorage.getItem('admin_logged_in') === 'true') {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    try {
      setBookings(JSON.parse(localStorage.getItem('bibenglow_bookings') || '[]'));
    } catch { setBookings([]); }
  }, [loggedIn]);

  const saveBookings = (b: Booking[]) => {
    setBookings(b);
    localStorage.setItem('bibenglow_bookings', JSON.stringify(b));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      setLoggedIn(true);
    } else {
      setError('Špatné heslo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    setLoggedIn(false);
    setPassword('');
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    saveBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    if (confirm('Smazat rezervaci?')) {
      saveBookings(bookings.filter(b => b.id !== id));
    }
  };

  const filtered = filterDate ? bookings.filter(b => b.booking_date === filterDate) : bookings;

  // Login screen
  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', padding: 16 }}>
        <div style={{ background: '#1a1a1a', padding: 32, borderRadius: 16, width: '100%', maxWidth: 380, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Přihlášení</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)} autoFocus
              style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', marginBottom: 12, boxSizing: 'border-box', fontSize: 16 }} />
            {error && <p style={{ color: '#f87171', fontSize: 14, marginBottom: 12 }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 16 }}>
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: 16 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <h1 style={{ fontSize: 20, fontWeight: 'bold' }}>Rezervace</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
              style={{ padding: '6px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', fontSize: 14 }} />
            {filterDate && <button onClick={() => setFilterDate('')} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>✕</button>}
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 14 }}>Odhlásit</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
            {filterDate ? 'Žádné rezervace na tento den' : 'Žádné rezervace'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(b => (
              <div key={b.id} style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{b.customer_name}</div>
                    <a href={`tel:${b.customer_phone}`} style={{ color: '#e5d3b3', textDecoration: 'none', fontSize: 14 }}>{b.customer_phone}</a>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: `${STATUS_COLORS[b.status]}22`, color: STATUS_COLORS[b.status] }}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: '#d1d5db', marginBottom: 4 }}>{b.service_name}</div>
                <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>{b.booking_date} v {b.start_time}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {b.status !== 'confirmed' && (
                    <button onClick={() => updateStatus(b.id, 'confirmed')}
                      style={{ padding: '6px 14px', background: '#166534', color: '#4ade80', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                      Potvrdit
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button onClick={() => updateStatus(b.id, 'cancelled')}
                      style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                      Zrušit
                    </button>
                  )}
                  <button onClick={() => deleteBooking(b.id)}
                    style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, marginLeft: 'auto' }}>
                    Smazat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: '#1a1a1a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>Statistiky</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div><span style={{ fontSize: 24, fontWeight: 'bold' }}>{bookings.length}</span><br /><span style={{ fontSize: 12, color: '#6b7280' }}>Celkem</span></div>
            <div><span style={{ fontSize: 24, fontWeight: 'bold', color: '#facc15' }}>{bookings.filter(b => b.status === 'pending').length}</span><br /><span style={{ fontSize: 12, color: '#6b7280' }}>Čekajících</span></div>
            <div><span style={{ fontSize: 24, fontWeight: 'bold', color: '#4ade80' }}>{bookings.filter(b => b.status === 'confirmed').length}</span><br /><span style={{ fontSize: 12, color: '#6b7280' }}>Potvrzených</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
