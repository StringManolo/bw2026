import { MarkdownRenderer, markdownStyles } from '../components/MarkdownRenderer';
import { securityBugs } from '../content/securityBugs';

export const SecurityBugDetailPage = ({ bugId, updateRoute, theme }) => {
  const bug = securityBugs.find(b => b.id === bugId);

  if (!bug) {
    return (
      <article>
        <h1 style={{ fontSize: '2.5em', marginBottom: '1em', fontWeight: 700 }}>Bug Not Found</h1>
        <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
          The security bug you're looking for doesn't exist.
        </p>
        <button
          onClick={() => updateRoute('security-bugs')}
          style={{
            padding: '0.75em 1.5em',
            backgroundColor: theme.isDark ? '#333' : '#f5f5f5',
            color: theme.text,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'all 0.25s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = theme.isDark ? '#444' : '#e5e5e5'}
          onMouseOut={(e) => e.target.style.backgroundColor = theme.isDark ? '#333' : '#f5f5f5'}
        >
          ← Back to Security Bugs
        </button>
      </article>
    );
  }

  return (
    <>
      <style>{markdownStyles(theme)}</style>
      <article>
        {/* Header */}
        <div style={{ marginBottom: '2em' }}>
          <button
            onClick={() => updateRoute('security-bugs')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.link || theme.text,
              cursor: 'pointer',
              fontSize: '0.9em',
              padding: '0.5em 0',
              marginBottom: '1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              transition: 'opacity 0.25s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.7'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            ← Back to Security Bugs
          </button>

          <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>
            {bug.title}
          </h1>

          {/* Metadata */}
          <div style={{
            display: 'flex',
            gap: '1.5em',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1em',
            color: theme.textSecondary,
            fontSize: '0.95em'
          }}>
            <span>{bug.date}</span>
            <span
              style={{
                color: '#fff',
                backgroundColor: getSeverityColor(bug.severity),
                padding: '0.25em 0.75em',
                borderRadius: '3px',
                fontSize: '0.9em',
                fontWeight: 600
              }}
            >
              {bug.severity}
            </span>
            {bug.cve && (
              <span style={{
                backgroundColor: theme.isDark ? '#2d2d2d' : '#f5f5f5',
                padding: '0.25em 0.75em',
                borderRadius: '3px',
                fontFamily: 'monospace'
              }}>
                {bug.cve}
              </span>
            )}
            {bug.vendor && <span>Vendor: {bug.vendor}</span>}
          </div>

          {/* Description */}
          {bug.description && (
            <p style={{
              color: theme.textSecondary,
              fontSize: '1.1em',
              lineHeight: '1.6',
              marginBottom: '2em',
              paddingBottom: '2em',
              borderBottom: `1px solid ${theme.border}`
            }}>
              {bug.description}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '3em' }}>
          <MarkdownRenderer content={bug.content} theme={theme} />
        </div>

        {/* Footer Info */}
        {(bug.references || bug.disclosure) && (
          <div style={{
            marginTop: '3em',
            paddingTop: '2em',
            borderTop: `1px solid ${theme.border}`
          }}>
            {bug.disclosure && (
              <div style={{ marginBottom: '1.5em' }}>
                <h3 style={{ fontSize: '1.1em', fontWeight: 700, marginBottom: '0.5em' }}>
                  Disclosure Timeline
                </h3>
                <ul style={{ color: theme.textSecondary, lineHeight: '1.8' }}>
                  {bug.disclosure.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {bug.references && bug.references.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1em', fontWeight: 700, marginBottom: '0.5em' }}>
                  References
                </h3>
                <ul style={{ color: theme.textSecondary, lineHeight: '1.8' }}>
                  {bug.references.map((ref, i) => (
                    <li key={i}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.link || theme.text }}
                      >
                        {ref.title || ref.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </article>
    </>
  );
};

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
