import { securityBugsIndex } from '../content/securityBugs/index';

export const SecurityBugsPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Security Bugs</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
      Real vulnerability reports and CVE disclosures
    </p>

    <div style={{ color: theme.textSecondary, lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        Collection of security vulnerabilities discovered through responsible disclosure. 
        Each report includes detailed findings, exploitation techniques, and remediation recommendations.
      </p>
    </div>

    <section style={{ marginBottom: '3em', paddingBottom: '2em', borderBottom: `1px solid ${theme.border}` }}>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>Latest Reports</h2>
      <div style={{ display: 'grid', gap: '2em' }}>
        {securityBugsIndex.map((bug) => (
  bug.isPrivateResearch ? (
    <PrivateResearchCard key={bug.id} bug={bug} updateRoute={updateRoute} theme={theme} />
  ) : (
    <BugReportCard key={bug.id} bug={bug} updateRoute={updateRoute} theme={theme} />
  )
))}
      </div>
    </section>
  </article>
);

// Componente especial para investigación privada
const PrivateResearchCard = ({ bug, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`security-bugs/${bug.id}`)}
    style={{
      padding: '1.5em',
      border: `2px dashed ${theme.border}`,
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: theme.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
      transition: 'all 0.25s ease'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginBottom: '0.5em' }}>
      <span style={{ fontSize: '1.5em' }}>🔒</span>
      <h3 style={{ fontSize: '1.1em', fontWeight: 700 }}>{bug.title}</h3>
    </div>
    <p style={{ color: theme.textSecondary, marginBottom: '0.5em' }}>{bug.date}</p>
    <p style={{ color: theme.textSecondary }}>{bug.description}</p>
    <div style={{ marginTop: '1em', color: theme.link, fontSize: '0.9em', fontWeight: 600 }}>
      Read more about private research →
    </div>
  </div>
);

const BugReportCard = ({ bug, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`security-bugs/${bug.id}`)}
    style={{
      paddingBottom: '1.5em',
      borderBottom: `1px solid ${theme.border}`,
      cursor: 'pointer',
      transition: 'all 0.25s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(5px)';
      e.currentTarget.style.opacity = '0.8';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.opacity = '1';
    }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.5em',
      gap: '1em'
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: '1.1em',
          fontWeight: 700,
          color: theme.text,
          marginBottom: '0.5em'
        }}>
          {bug.title}
        </h3>
        <div style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.9em',
          color: theme.textSecondary
        }}>
          <span>{bug.date}</span>
          {bug.vendor && <span>• {bug.vendor}</span>}
          {bug.cve && (
            <span style={{
              backgroundColor: theme.codeBg,
              padding: '0.2em 0.6em',
              borderRadius: '3px',
              fontFamily: 'monospace',
              fontSize: '0.85em'
            }}>
              {bug.cve}
            </span>
          )}
        </div>
      </div>
      
      <span style={{
        fontSize: '0.85em',
        color: '#fff',
        backgroundColor: getSeverityColor(bug.severity),
        padding: '0.3em 0.8em',
        borderRadius: '3px',
        fontWeight: 600,
        whiteSpace: 'nowrap'
      }}>
        {bug.severity}
      </span>
    </div>
    
    <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>
      {bug.description}
    </p>
    
    <div style={{
      marginTop: '0.75em',
      color: theme.link || (theme.isDark ? '#58a6ff' : '#0366d6'),
      fontSize: '0.9em',
      fontWeight: 600
    }}>
      Read full writeup →
    </div>
  </div>
);

// Helper function para colores de severidad
const getSeverityColor = (severity) => {
  const colors = {
    'Critical': '#cc3333',
    'High': '#d9534f',
    'Medium': '#f0ad4e',
    'Low': '#5cb85c',
    'Info': '#5bc0de'
  };
  return colors[severity] || '#999';
};
