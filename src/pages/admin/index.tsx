import React, { useState } from 'react';

export const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('admin_logged_in') === 'true'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'services' | 'about' | 'contacts'>('services');

  // Services
  const [services, setServices] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adminServices') || '[]'); } catch { return []; }
  });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [newService, setNewService] = useState({ title: '', price: '', category: '', desc: '' });

  // About
  const [aboutText, setAboutText] = useState(() => localStorage.getItem('adminAbout') || '');

  // Contacts
  const [contacts, setContacts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adminContacts') || '{}'); } catch { return {}; }
  });

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
  };

  const saveServices = (s: typeof services) => {
    setServices(s);
    localStorage.setItem('adminServices', JSON.stringify(s));
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ background: '#1a1a1a', padding: 32, borderRadius: 16, width: '100%', maxWidth: 400, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Administrace</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', marginBottom: 12, boxSizing: 'border-box' }} />
            {error && <p style={{ color: '#f87171', fontSize: 14, marginBottom: 12 }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '10px 0', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Administrace</h1>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>Odhlásit</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['services', 'about', 'contacts'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 500, cursor: 'pointer',
                background: activeTab === tab ? '#e5d3b3' : 'rgba(255,255,255,0.1)', color: activeTab === tab ? '#000' : '#fff' }}>
              {tab === 'services' ? 'Služby' : tab === 'about' ? 'O mně' : 'Kontakty'}
            </button>
          ))}
        </div>

        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2>Správa služeb</h2>
              <button onClick={() => { setEditIdx(-1); setNewService({ title: '', price: '', category: '', desc: '' }); }}
                style={{ padding: '8px 16px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                + Přidat
              </button>
            </div>

            {editIdx !== null && (
              <div style={{ background: '#1a1a1a', padding: 16, borderRadius: 12, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <input placeholder="Název" value={editIdx === -1 ? newService.title : (services[editIdx]?.title || '')}
                    onChange={e => editIdx === -1 ? setNewService({ ...newService, title: e.target.value }) : null}
                    style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff' }} />
                  <input placeholder="Cena" value={editIdx === -1 ? newService.price : (services[editIdx]?.price || '')}
                    onChange={e => editIdx === -1 ? setNewService({ ...newService, price: e.target.value }) : null}
                    style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff' }} />
                  <input placeholder="Kategorie" value={editIdx === -1 ? newService.category : (services[editIdx]?.category || '')}
                    onChange={e => editIdx === -1 ? setNewService({ ...newService, category: e.target.value }) : null}
                    style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', gridColumn: 'span 2' }} />
                  <input placeholder="Popis" value={editIdx === -1 ? newService.desc : (services[editIdx]?.desc || '')}
                    onChange={e => editIdx === -1 ? setNewService({ ...newService, desc: e.target.value }) : null}
                    style={{ padding: 8, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', gridColumn: 'span 2' }} />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => {
                    if (editIdx === -1) { saveServices([...services, newService]); }
                    setEditIdx(null);
                  }} style={{ padding: '6px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Uložit</button>
                  <button onClick={() => setEditIdx(null)} style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Zrušit</button>
                </div>
              </div>
            )}

            {services.map((s: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '12px 16px', borderRadius: 8, marginBottom: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  {s.category && <span style={{ fontSize: 12, color: '#e5d3b3', marginRight: 8 }}>{s.category}</span>}
                  <span>{s.title}</span>
                  <span style={{ color: '#9ca3af', marginLeft: 8 }}>{s.price}</span>
                </div>
                <button onClick={() => saveServices(services.filter((_: any, j: number) => j !== i))}
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}>Smazat</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 style={{ marginBottom: 12 }}>Text "O mně"</h2>
            <textarea value={aboutText} onChange={e => setAboutText(e.target.value)}
              style={{ width: '100%', height: 250, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: 12, borderRadius: 12, color: '#fff', resize: 'vertical' }} />
            <button onClick={() => { localStorage.setItem('adminAbout', aboutText); alert('Uloženo'); }}
              style={{ marginTop: 12, padding: '8px 16px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Uložit</button>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 style={{ marginBottom: 12 }}>Kontakty</h2>
            <div style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
              {['address', 'phone', 'email', 'hours', 'facebook', 'instagram'].map(field => (
                <input key={field} placeholder={field} value={contacts[field] || ''}
                  onChange={e => setContacts({ ...contacts, [field]: e.target.value })}
                  style={{ padding: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff' }} />
              ))}
            </div>
            <button onClick={() => { localStorage.setItem('adminContacts', JSON.stringify(contacts)); alert('Uloženo'); }}
              style={{ marginTop: 12, padding: '8px 16px', background: '#e5d3b3', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Uložit</button>
          </div>
        )}
      </div>
    </div>
  );
};
