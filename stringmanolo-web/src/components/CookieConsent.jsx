import { useEffect, useState } from 'react';

export const CookieConsent = ({ theme }) => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verificar si ya aceptó cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.bg,
      borderTop: `1px solid ${theme.border}`,
      padding: '2em 5vw',
      zIndex: 999,
      boxShadow: `0 -2px 10px ${theme.hover}`,
      transition: 'background-color 0.25s, border-color 0.25s'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: theme.textSecondary, marginBottom: '1em', lineHeight: '1.6' }}>
          We use cookies to enhance your experience. By continuing to browse this site, you agree to our use of cookies.
          Read our <a href="#cookie-policy" style={{ color: theme.text, borderBottom: `1px solid ${theme.border}` }}>Cookie Policy</a> and
          <a href="#privacy-policy" style={{ color: theme.text, borderBottom: `1px solid ${theme.border}`, marginLeft: '0.25em' }}>Privacy Policy</a>.
        </p>
        <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
          <button
            onClick={handleAccept}
            style={{
              backgroundColor: theme.text,
              color: theme.bg,
              border: 'none',
              padding: '0.75em 1.5em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '1em',
              transition: 'background-color 0.25s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme.accent}
            onMouseLeave={(e) => e.target.style.backgroundColor = theme.text}
          >
            Accept All
          </button>
          <button
            onClick={handleReject}
            style={{
              backgroundColor: 'transparent',
              color: theme.text,
              border: `1px solid ${theme.text}`,
              padding: '0.75em 1.5em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '1em',
              transition: 'all 0.25s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.text;
              e.target.style.color = theme.bg;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = theme.text;
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
