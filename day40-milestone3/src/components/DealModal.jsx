import { useState } from 'react';
import FormField from './FormField';
import { STAGES } from '../store/dealsSlice';

// Add / Edit deal dialog (uses the original .modal-* styles)
export default function DealModal({ deal, contacts, onSave, onClose }) {
  const [form, setForm] = useState({
    title: deal?.title ?? '',
    value: deal?.value ?? '',
    contactId: deal?.contactId ?? '',
    stage: deal?.stage ?? 'new',
    dueDate: deal?.dueDate ?? '',
  });
  const [errors, setErrors] = useState({});

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (form.value === '' || Number(form.value) < 0 || Number.isNaN(Number(form.value)))
      errs.value = 'Enter a valid deal value.';
    if (!form.contactId) errs.contactId = 'Please select a contact.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const contact = contacts.find((c) => c.id === form.contactId);
    onSave({
      ...(deal ? { id: deal.id } : {}),
      title: form.title.trim(),
      value: Number(form.value),
      contactId: form.contactId,
      contactName: contact ? contact.name : '',
      stage: form.stage,
      dueDate: form.dueDate,
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">{deal ? 'Edit Deal' : 'Add Deal'}</h3>
          <button type="button" className="modal-close-btn" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="modal-body">
            <FormField id="deal-title" name="title" label="Title" value={form.title} onChange={set} error={errors.title} placeholder="Deal title" />
            <FormField id="deal-value" name="value" label="Value ($)" type="number" min="0" value={form.value} onChange={set} error={errors.value} placeholder="5000" />
            <FormField id="deal-contact" name="contactId" label="Contact" as="select" value={form.contactId} onChange={set} error={errors.contactId}>
              <option value="">Select a contact...</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </FormField>
            <FormField id="deal-stage" name="stage" label="Stage" as="select" value={form.stage} onChange={set}>
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </FormField>
            <FormField id="deal-due" name="dueDate" label={form.stage === 'won_lost' ? 'Closed Date' : 'Due Date'} type="date" value={form.dueDate} onChange={set} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{deal ? 'Save Deal' : 'Add Deal'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
