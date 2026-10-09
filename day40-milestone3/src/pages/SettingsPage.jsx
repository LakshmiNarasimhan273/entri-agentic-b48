import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../components/FormField';
import { updateProfile, changePassword } from '../store/authSlice';
import { savePreferences } from '../store/preferencesSlice';
import { EMAIL_REGEX } from '../utils/helpers';

const MAX_AVATAR_BYTES = 300 * 1024; // keep localStorage small

export default function SettingsPage() {
  const session = useSelector((s) => s.auth.session);
  const users = useSelector((s) => s.auth.users);
  const prefs = useSelector((s) => s.preferences);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState({ name: session.name, email: session.email });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileMsg, setProfileMsg] = useState('');
  const [avatarError, setAvatarError] = useState('');

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwErrors, setPwErrors] = useState({});
  const [pwMsg, setPwMsg] = useState('');

  const [prefForm, setPrefForm] = useState(prefs);
  const [prefMsg, setPrefMsg] = useState('');

  const saveProfile = (e) => {
    e.preventDefault();
    const name = profile.name.trim();
    const email = profile.email.trim();
    const errs = {};
    if (!name) errs.name = 'Name is required.';
    if (!email) errs.email = 'Email is required.';
    else if (!EMAIL_REGEX.test(email)) errs.email = 'Please enter a valid email address.';
    else if (users.some((u) => u.id !== session.id && u.email.toLowerCase() === email.toLowerCase()))
      errs.email = 'An account with this email already exists.';
    setProfileErrors(errs);
    setProfileMsg('');
    if (Object.keys(errs).length) return;
    dispatch(updateProfile({ name, email }));
    setProfileMsg('Profile updated successfully.');
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return setAvatarError('Please choose an image file.');
    if (file.size > MAX_AVATAR_BYTES) return setAvatarError('Image must be smaller than 300 KB.');
    setAvatarError('');
    const reader = new FileReader();
    reader.onload = () => dispatch(updateProfile({ avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const savePassword = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.id === session.id);
    const errs = {};
    if (!pw.current) errs.current = 'Current password is required.';
    else if (!user || user.password !== pw.current) errs.current = 'Current password is incorrect.';
    if (!pw.next) errs.next = 'New password is required.';
    else if (pw.next.length < 6) errs.next = 'Password must be at least 6 characters long.';
    if (!pw.confirm) errs.confirm = 'Please confirm your new password.';
    else if (pw.next !== pw.confirm) errs.confirm = 'Passwords do not match.';
    setPwErrors(errs);
    setPwMsg('');
    if (Object.keys(errs).length) return;
    dispatch(changePassword(pw.next));
    setPw({ current: '', next: '', confirm: '' });
    setPwMsg('Password changed successfully.');
  };

  const savePrefs = (e) => {
    e.preventDefault();
    dispatch(savePreferences(prefForm));
    setPrefMsg('Preferences saved.');
  };

  const togglePref = (e) => {
    setPrefForm({ ...prefForm, [e.target.name]: e.target.checked });
    setPrefMsg('');
  };

  return (
    <>
      <div className="settings-header">
        <h2>User Settings</h2>
      </div>

      <div className="card profile-section">
        <h3>Profile Information</h3>
        <form onSubmit={saveProfile} noValidate>
          <div className="avatar-upload">
            <div className="avatar-preview">
              {session.avatar ? <img src={session.avatar} alt="User Avatar" /> : <i className="fas fa-user"></i>}
            </div>
            <button type="button" className="btn btn-secondary" onClick={() => fileRef.current.click()}>Upload New Avatar</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} data-testid="avatar-input" />
          </div>
          {avatarError && <div className="input-error-message">{avatarError}</div>}
          <div className="form-grid">
            <FormField id="name" label="Name" value={profile.name} error={profileErrors.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <FormField id="email" label="Email" type="email" value={profile.email} error={profileErrors.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </div>
          {profileMsg && <div className="success-message">{profileMsg}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </div>
        </form>
      </div>

      <div className="card password-section">
        <h3>Change Password</h3>
        <form onSubmit={savePassword} noValidate>
          <div className="form-grid">
            <FormField id="current-password" label="Current Password" type="password" placeholder="********" className="full-width"
              value={pw.current} error={pwErrors.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            <FormField id="new-password" label="New Password" type="password" placeholder="********"
              value={pw.next} error={pwErrors.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
            <FormField id="confirm-new-password" label="Confirm New Password" type="password" placeholder="********"
              value={pw.confirm} error={pwErrors.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          </div>
          {pwMsg && <div className="success-message">{pwMsg}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Change Password</button>
          </div>
        </form>
      </div>

      <div className="card notifications-section">
        <h3>Notification Preferences</h3>
        <form onSubmit={savePrefs}>
          <div className="checkbox-group">
            <input type="checkbox" id="email-notifications" name="emailNotifications" checked={!!prefForm.emailNotifications} onChange={togglePref} />
            <label htmlFor="email-notifications">Email Notifications</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="app-notifications" name="appNotifications" checked={!!prefForm.appNotifications} onChange={togglePref} />
            <label htmlFor="app-notifications">In-App Notifications</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="marketing-emails" name="marketingEmails" checked={!!prefForm.marketingEmails} onChange={togglePref} />
            <label htmlFor="marketing-emails">Marketing Emails</label>
          </div>
          {prefMsg && <div className="success-message">{prefMsg}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    </>
  );
}
