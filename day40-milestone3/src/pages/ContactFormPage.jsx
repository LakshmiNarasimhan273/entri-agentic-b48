import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../components/FormField';
import { addContact, updateContact } from '../store/contactsSlice';
import { EMAIL_REGEX } from '../utils/helpers';

const EMPTY = { name: '', email: '', phone: '', company: '', tags: '', notes: '' };

export default function ContactFormPage() {
  const { id } = useParams();
  const existing = useSelector((s) => s.contacts.items.find((c) => c.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(existing ? { ...EMPTY, ...existing } : EMPTY);
  const [errors, setErrors] = useState({});

  if (id && !existing) return <Navigate to="/contacts" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    if (Object.keys(errs).length) return setErrors(errs);

    const data = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      tags: form.tags.trim(),
      notes: form.notes.trim(),
    };
    dispatch(existing ? updateContact({ id: existing.id, ...data }) : addContact(data));
    navigate('/contacts');
  };

  return (
    <>
      <div className="contact-form-header">
        <h2>{existing ? 'Edit Contact' : 'Add New Contact'}</h2>
        <Link to="/contacts" className="btn btn-secondary"><i className="fas fa-arrow-left"></i>&nbsp;Back to Contacts</Link>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); setForm(existing ? { ...EMPTY, ...existing } : EMPTY); setErrors({}); }} noValidate>
          <div className="form-grid">
            <FormField id="name" name="name" label="Name" placeholder="Contact's Full Name" value={form.name} onChange={handleChange} error={errors.name} />
            <FormField id="email" name="email" label="Email" type="email" placeholder="contact@example.com" value={form.email} onChange={handleChange} error={errors.email} />
            <FormField id="phone" name="phone" label="Phone" type="tel" placeholder="123-456-7890" value={form.phone} onChange={handleChange} />
            <FormField id="company" name="company" label="Company" placeholder="Company Name" value={form.company} onChange={handleChange} />
            <FormField id="tags" name="tags" label="Tags (comma separated)" className="full-width" placeholder="e.g., customer, lead, VIP" value={form.tags} onChange={handleChange} />
            <FormField id="notes" name="notes" label="Notes" as="textarea" rows="5" className="full-width" placeholder="Any additional notes about the contact..." value={form.notes} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="reset" className="btn btn-secondary">Reset</button>
            <button type="submit" className="btn btn-primary">Save Contact</button>
          </div>
        </form>
      </div>
    </>
  );
}
