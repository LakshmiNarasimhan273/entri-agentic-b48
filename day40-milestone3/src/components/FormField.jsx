// Label + input (or textarea) + error message, using the original .input-group markup
export default function FormField({ id, label, error, as = 'input', className = '', ...props }) {
  const Control = as;
  return (
    <div className={`input-group ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <Control id={id} className={`input-field${error ? ' error' : ''}`} {...props} />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
}
