import React, { useState, useEffect } from 'react';
import type { Booking, BlockedSlot } from '../../types/booking';

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

function getBlockedSlots(): BlockedSlot[] {
  try { return JSON.parse(localStorage.getItem('blocked_slots') || '[]'); } catch { return []; }
}

function saveBlockedSlots(slots: BlockedSlot[]) {
  localStorage.setItem('blocked_slots', JSON.stringify(slots));
}

export const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'blocks'>('bookings');

  // Block form state
  const [blockDate, setBlockDate] = useState('');
  const [blockStart, setBlockStart] = useState('09:00');
  const [blockEnd, setBlockEnd] = useState('18:00');
  const [blockReason, setBlockReason] = useState('');
  const [blockAllDay, setBlockAllDay] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);

  useEffect(() => {
    if (localStorage.getItem('admin_logged_in') === 'true') setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    try { setBookings(JSON.parse(localStorage.getItem('bibenglow_bookings') || '[]')); } catch { setBookings([]); }
    setBlockedSlots(getBlockedSlots());
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
    if (confirm('Smazat rezervaci?')) saveBookings(bookings.filter(b => b.id !== id));
  };

  const handleBlock = () => {
    if (!blockDate) { alert('Vyberte datum'); return; }
    const newBlock: BlockedSlot = {
      id: Date.now().toString(36),
      blocked_date: blockDate,
      start_time: blockAllDay ? '00:00' : blockStart,
      end_time: blockAllDay ? '23:59' : blockEnd,
      reason: blockReason || 'Blokováno administrátorem',
      created_at: new Date().toISOString(),
    };
    const updated = [...blockedSlots, newBlock];
    setBlockedSlots(updated);
    saveBlockedSlots(updated);
    setBlockDate('');
    setBlockReason('');
    setBlockAllDay(false);
  };

  const removeBlock = (id: string) => {
    const updated = blockedSlots.filter(b => b.id !== id);
    setBlockedSlots(updated);
    saveBlockedSlots(updated);
  };

  const filtered = filterDate ? bookings.filter(b => b.booking_date === filterDate) : bookings;

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', padding: 16 }}>
        <div style={{ background: '#1a1a1a', padding: 32, borderRadius: 16, width: '100%', maxWidth: 380, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Přihlášení</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)} autoFocus
              style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', marginBottom: 12, boxSizing: 'border-box', fontSize: 16 }} />
            {error && <p style={{ color: '#f87171', fontSize: 14, marginBottom: 12 }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 16 }}>Přihlásit se</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: 16 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <h1 style={{ fontSize: 20, fontWeight: 'bold' }}>Administrace</h1>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 14 }}>Odhlásit</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button onClick={() => setActiveTab('bookings')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer', background: activeTab === 'bookings' ? '#e5d3b3' : 'rgba(255,255,255,0.1)', color: activeTab === 'bookings' ? '#000' : '#fff' }}>Rezervace</button>
          <button onClick={() => setActiveTab('blocks')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer', background: activeTab === 'blocks' ? '#e5d3b3' : 'rgba(255,255,255,0.1)', color: activeTab === 'blocks' ? '#000' : '#fff' }}>Blokování</button>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                style={{ padding: '6px 10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', fontSize: 14 }} />
              {filterDate && <button onClick={() => setFilterDate('')} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>✕</button>}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>Žádné rezervace</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.map(b => (
                  <div key={b.id} style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{b.customer_name}</div>
                        <a href={`tel:${b.customer_phone}`} style={{ color: '#e5d3b3', textDecoration: 'none', fontSize: 14 }}>{b.customer_phone}</a>
                        {b.customer_email && <div style={{ fontSize: 13, color: '#9ca3af' }}>{b.customer_email}</div>}
                      </div>
                      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: `${STATUS_COLORS[b.status]}22`, color: STATUS_COLORS[b.status] }}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, color: '#d1d5db', marginBottom: 4 }}>{b.service_name}</div>
                    <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>{b.booking_date} v {b.start_time}</div>
                    {b.notes && <div style={{ fontSize: 13, color: '#a3a3a3', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 8, marginBottom: 10, borderLeft: '3px solid #e5d3b3' }}>{b.notes}</div>}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'confirmed')} style={{ padding: '6px 14px', background: '#166534', color: '#4ade80', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Potvrdit</button>}
                      {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed')} style={{ padding: '6px 14px', background: '#1e3a5f', color: '#60a5fa', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Proběhla</button>}
                      {b.status !== 'cancelled' && b.status !== 'completed' && <button onClick={() => updateStatus(b.id, 'cancelled')} style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Zrušit</button>}
                      <button onClick={() => deleteBooking(b.id)} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, marginLeft: 'auto' }}>Smazat</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BLOCKS TAB */}
        {activeTab === 'blocks' && (
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 12 }}>Blokování termínů</h2>
            <div style={{ background: '#1a1a1a', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8, marginBottom: 12 }}>
                <input type="date" value={blockDate} onChange={e => setBlockDate(e.target.value)}
                  style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff' }} />
                {!blockAllDay && (
                  <>
                    <input type="time" value={blockStart} onChange={e => setBlockStart(e.target.value)}
                      style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff' }} />
                    <input type="time" value={blockEnd} onChange={e => setBlockEnd(e.target.value)}
                      style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff' }} />
                  </>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                  <input type="checkbox" checked={blockAllDay} onChange={e => setBlockAllDay(e.target.checked)} style={{ accentColor: '#e5d3b3' }} />
                  Blokovat celý den
                </label>
                <input type="text" placeholder="Důvod (volitelné)" value={blockReason} onChange={e => setBlockReason(e.target.value)}
                  style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', flex: 1, minWidth: 200 }} />
              </div>
              <button onClick={handleBlock} style={{ padding: '8px 16px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Zablokovat</button>
            </div>

            {/* Blocked slots list */}
            <h3 style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>Zablokované termíny</h3>
            {blockedSlots.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: 20 }}>Žádné blokace</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {blockedSlots.map(b => (
                  <div key={b.id} style={{ background: '#1a1a1a', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontSize: 14 }}>{b.blocked_date} {b.start_time === '00:00' && b.end_time === '23:59' ? '(celý den)' : `${b.start_time} – ${b.end_time}`}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{b.reason}</div>
                    </div>
                    <button onClick={() => removeBlock(b.id)} style={{ padding: '4px 10px', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Odebrat</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
