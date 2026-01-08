export const WriteupsPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Writeups</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>Detailed vulnerability reports and analysis</p>
    
    <section style={{ marginBottom: '3em', paddingBottom: '2em', borderBottom: '1px solid #e5e5e5' }}>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>XSS Vulnerabilities</h2>
      <div style={{ display: 'grid', gap: '1.5em' }}>
        <WriteupLink title="3 x 1 - Multiple Vulnerabilities" desc="Reflected XSS, predictable credentials, and CSRF vulnerabilities chained together." />
        <WriteupLink title="Stored XSS - W3Schools" desc="Input validation flaw in profile editor allowing arbitrary JavaScript execution." />
        <WriteupLink title="Clickjacking + XSS - Intigriti" desc="Advanced technique combining clickjacking with XSS for privilege escalation." />
      </div>
    </section>

    <section>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>CSRF Vulnerabilities</h2>
      <div style={{ display: 'grid', gap: '1.5em' }}>
        <WriteupLink title="Logout CSRF - W3Schools" desc="Logout endpoint vulnerable to CSRF attacks, allowing account takeover." />
      </div>
    </section>
  </article>
);

const WriteupLink = ({ title, desc }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>{title}</h3>
    <p style={{ color: theme.textSecondary, fontSize: '0.95em' }}>{desc}</p>
  </div>
);
