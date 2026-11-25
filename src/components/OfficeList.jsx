import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import LibraryButton from './LibraryButton';

const API = 'http://localhost:8080/api/office';

function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadOffices() {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API}/all`);
      setOffices(response.data);
    } catch (err) {
      setError('Could not load offices: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffices();
  }, []);

  // Client-side search by name OR office number (case-insensitive)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return offices;
    return offices.filter((o) =>
      o.name?.toLowerCase().includes(q) ||
      String(o.officeNumber).includes(q)
    );
  }, [search, offices]);

  async function handleDelete(office) {
    const ok = window.confirm(
      `Delete office "${office.name}" (No. ${office.officeNumber})?`
    );
    if (!ok) return;

    try {
      const response = await axios.delete(`${API}/delete/${office.id}`);
      if (response.status >= 200 && response.status < 300) {
        alert('Office deleted successfully');
        // remove from local state so the table updates immediately
        setOffices((prev) => prev.filter((o) => o.id !== office.id));
      } else {
        alert('Office not deleted: ' + (response.data || response.status));
      }
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data || err.message));
    }
  }

  // Shown per spec, but intentionally a no-op for now
  function handleUpdate() {
    // TODO: implement update later
    console.log('Update not implemented yet');
  }

  return (
    <div>
      <h1>ALL OFFICES</h1>

      <label>Search (name or number): </label>
      <input
        type="text"
        placeholder="e.g. Reception or 12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br /><br />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Office Name</th>
              <th>Office Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No offices match your search.
                </td>
              </tr>
            ) : (
              filtered.map((office, index) => (
                <tr key={office.id}>
                  <td>{index + 1}</td>
                  <td>{office.name}</td>
                  <td>{office.officeNumber}</td>
                  <td>
                    <LibraryButton
                      buttonLabel="Update"
                      onClickButton={handleUpdate}
                    />{' '}
                    <LibraryButton
                      buttonLabel="Delete"
                      onClickButton={() => handleDelete(office)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OfficeList;