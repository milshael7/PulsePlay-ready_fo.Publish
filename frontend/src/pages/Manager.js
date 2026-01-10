// frontend/src/pages/Manager.js
import React, { useState, useEffect } from 'react';
import AIHelper from '../components/AIHelper';

export default function Manager() {
  const [users, setUsers] = useState([]);
  const [moderationQueue, setModerationQueue] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
    fetchModerationQueue();

    const interval = setInterval(() => {
      fetchUsers();
      fetchModerationQueue();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    setUsers([
      { id: 1, name: "Alice", trustScore: 87, engagement: 120, online: true },
      { id: 2, name: "Bob", trustScore: 92, engagement: 200, online: false },
      { id: 3, name: "Charlie", trustScore: 70, engagement: 80, online: true },
      { id: 4, name: "David", trustScore: 95, engagement: 230, online: true },
      { id: 5, name: "Eve", trustScore: 65, engagement: 60, online: false },
      { id: 6, name: "Frank", trustScore: 78, engagement: 150, online: true },
    ]);
  };

  const fetchModerationQueue = async () => {
    setModerationQueue([
      { id: 101, type: "comment", content: "Spam comment example" },
      { id: 102, type: "video", content: "Inappropriate video flagged" },
    ]);
  };const filteredUsers = users
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]));

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="manager-page" style={styles.page}>
      <h2 style={styles.title}>Manager Dashboard</h2>
      <AIHelper role="manager" />

      {/* User Analytics */}
      <section style={styles.section}>
        <h3>User Analytics</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        /><table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => toggleSort('name')}>Name</th>
              <th style={styles.th} onClick={() => toggleSort('trustScore')}>Trust Score</th>
              <th style={styles.th} onClick={() => toggleSort('engagement')}>Engagement</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>
                  <div style={styles.barContainer}>
                    <div style={{ ...styles.trustBar, width: `${user.trustScore}%` }} />
                    <span style={styles.barLabel}>{user.trustScore}%</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.barContainer}>
                    <div style={{ ...styles.engagementBar, width: `${Math.min(user.engagement, 250)/2.5}%` }} />
                    <span style={styles.barLabel}>{user.engagement}</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.statusBadge, backgroundColor: user.online ? '#28a745' : '#6c757d' }}>
                    {user.online ? 'Online' : 'Offline'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </section>

      {/* Moderation Queue */}
      <section style={styles.section}>
        <h3>Moderation Queue</h3>
        {moderationQueue.map(item => (
          <div key={item.id} style={styles.card}>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Content:</strong> {item.content}</p>
            <button style={styles.approve}>Approve</button>
            <button style={styles.reject}>Reject</button>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' },
  title: { fontSize: '2rem', marginBottom: '20px' },
  section: { marginBottom: '30px' },
  searchInput: { padding: '6px 12px', marginBottom: '10px', width: '250px' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '10px' },
  th: { borderBottom: '2px solid #ccc', textAlign: 'left', padding: '10px', cursor: 'pointer', backgroundColor: '#e9ecef' },
  td: { borderBottom: '1px solid #ddd', padding: '10px', verticalAlign: 'middle' },
  barContainer: { position: 'relative', background: '#e0e0e0', borderRadius: '4px', height: '20px', width: '100%' },
  trustBar: { position: 'absolute', left: 0, top: 0, height: '100%', backgroundColor: '#007bff', borderRadius: '4px' },
  engagementBar: { position: 'absolute', left: 0, top: 0, height: '100%', backgroundColor: '#28a745', borderRadius: '4px' },
  barLabel: { position: 'absolute', width: '100%', textAlign: 'center', fontSize: '12px', color: '#fff', fontWeight: 'bold' },
  statusBadge: { padding: '4px 10px', borderRadius: '12px', color: '#fff', fontWeight: 'bold' },
  card: { border: '1px solid #ccc', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#fff' },
  approve: { marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer' },
  reject: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer' },
  pagination: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' },
};