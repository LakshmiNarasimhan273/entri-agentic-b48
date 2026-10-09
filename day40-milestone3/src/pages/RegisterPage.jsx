import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../components/FormField';
import { registerUser } from '../store/authSlice';
import { EMAIL_REGEX } from '../utils/helpers';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const users = useSelector((s) => s.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    const confirm = form.confirm.trim();
    const errs = {};

    if (!name) errs.name = 'Name is required.';

    if (!email) errs.email = 'Email is required.';
    else if (!EMAIL_REGEX.test(email)) errs.email = 'Please enter a valid email address.';

    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters long.';

    if (!confirm) errs.confirm = 'Please confirm your password.';
    else if (password !== confirm) errs.confirm = 'Passwords do not match.';

    if (!errs.email && users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      errs.email = 'An account with this email already exists.';
    }
    if (Object.keys(errs).length) return setErrors(errs);

    dispatch(registerUser({ id: 'u_' + Date.now(), name, email, password }));
    alert('Registration successful! Redirecting to Dashboard.');
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="signup-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <FormField id="name" name="name" label="Name" placeholder="Your Full Name"
            value={form.name} onChange={handleChange} error={errors.name} />
          <FormField id="email" name="email" label="Email" type="email" placeholder="your@example.com"
            value={form.email} onChange={handleChange} error={errors.email} />
          <FormField id="password" name="password" label="Password" type="password" placeholder="********"
            value={form.password} onChange={handleChange} error={errors.password} />
          <FormField id="confirm-password" name="confirm" label="Confirm Password" type="password" placeholder="********"
            value={form.confirm} onChange={handleChange} error={errors.confirm} />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        <div className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
