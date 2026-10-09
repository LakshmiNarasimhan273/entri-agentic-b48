import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../components/FormField';
import { login } from '../store/authSlice';
import { EMAIL_REGEX } from '../utils/helpers';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const users = useSelector((s) => s.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.email.trim();
    const password = form.password.trim();
    const errs = {};

    if (!email) errs.email = 'Email address is required.';
    else if (!EMAIL_REGEX.test(email)) errs.email = 'Please enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    if (Object.keys(errs).length) return setErrors(errs);

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return setErrors({ email: 'Invalid email or password.' });
    }

    dispatch(login(user));
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSubmit} noValidate>
          <FormField id="email" name="email" label="Email" type="email" placeholder="your@example.com"
            value={form.email} onChange={handleChange} error={errors.email} />
          <FormField id="password" name="password" label="Password" type="password" placeholder="********"
            value={form.password} onChange={handleChange} error={errors.password} />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Login</button>
            <a href="#" className="link-text" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
          </div>
        </form>
        <div className="link-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
