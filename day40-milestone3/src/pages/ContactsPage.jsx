import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../store/contactsSlice';
import { badgeClass, formatTag, parseTags } from '../utils/helpers';

export default function ContactsPage() {
  const contacts = useSelector((s) => s.contacts.items);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  const q = search.trim().toLowerCase();
  const filtered = contacts.filter((c) => {
    const matchesSearch =
      !q || [c.name, c.email, c.phone, c.company].some((f) => (f || '').toLowerCase().includes(q));
    const matchesTag = !tag || parseTags(c.tags).some((t) => t.toLowerCase() === tag);
    return matchesSearch && matchesTag;
  });

  const handleDelete = (c) => {
    if (window.confirm(`Delete contact "${c.name}"?`)) dispatch(deleteContact(c.id));
  };

  return (
    <>
      <div className="contacts-header">
        <h2>Your Contacts</h2>
        <Link to="/contacts/new" className="btn btn-primary"><i className="fas fa-plus"></i>&nbsp;Add Contact</Link>
      </div>

      <div className="search-filter-bar">
        <input type="text" className="input-field" placeholder="Search contacts..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="select-field" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All Tags</option>
          <option value="customer">Customer</option>
          <option value="lead">Lead</option>
          <option value="partner">Partner</option>
        </select>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Tags</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.company}</td>
                  <td>
                    {parseTags(c.tags).map((t) => (
                      <span key={t} className={`badge ${badgeClass(t)}`}>{formatTag(t)}</span>
                    ))}
                  </td>
                  <td>
                    <Link to={`/contacts/${c.id}/edit`} className="action-button" title="Edit"><i className="fas fa-edit"></i></Link>
                    <button className="action-button" title="Delete" onClick={() => handleDelete(c)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="empty-row">No contacts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
