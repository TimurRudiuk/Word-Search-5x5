import "./Button.css";

function Button({ 
  text, 
  onClick, 
  primary = false, 
  secondary = false, 
  success = false,
  warning = false,
  danger = false,
  size = "medium",
  disabled = false,
  fullWidth = false,
  type = "button"
}) {
  const buttonClass = `
    button 
    ${primary ? 'button-primary' : ''}
    ${secondary ? 'button-secondary' : ''}
    ${success ? 'button-success' : ''}
    ${warning ? 'button-warning' : ''}
    ${danger ? 'button-danger' : ''}
    ${size === 'small' ? 'button-small' : size === 'large' ? 'button-large' : ''}
    ${fullWidth ? 'button-full-width' : ''}
    ${disabled ? 'button-disabled' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;