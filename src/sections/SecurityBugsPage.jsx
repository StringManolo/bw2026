import { securityBugs } from '../content/securityBugs';

export const SecurityBugsPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Security Bugs</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>Real vulnerability reports and CVE disclosures</p>

    <div style={{ color: '#555', lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        Collection of security vulnerabilities discovered through responsible disclosure. Each report includes detailed findings, exploitation techniques, and remediation recommendations.
      </p>
    </div>

    <section style={{ marginBottom: '3em', paddingBottom: '2em', borderBottom: '1px solid #e5e5e5' }}>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>Latest Reports</h2>
      <div style={{ display: 'grid', gap: '2em' }}>
        {securityBugs.map((bug) => (
          <BugReportCard 
            key={bug.id}
            title={bug.title}
            date={bug.date}
            severity={bug.severity}
            desc={bug.description}
          />
        ))}
      </div>
    </section>
  </article>
);

const BugReportCard = ({ title, date, severity, desc }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5em' }}>
      <h3 style={{ fontSize: '1.1em', fontWeight: 700 }}>{title}</h3>
      <span style={{ 
        fontSize: '0.85em',
        color: '#fff',
        backgroundColor: severity === 'Critical' ? '#c33' : '#d9534f',
        padding: '0.25em 0.75em',
        borderRadius: '2px'
      }}>
        {severity}
      </span>
    </div>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>{date}</p>
    <p style={{ color: '#555' }}>{desc}</p>
  </div>
);
