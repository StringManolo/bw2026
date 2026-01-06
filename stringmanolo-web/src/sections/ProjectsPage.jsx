export const ProjectsPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>Projects</h1>
    
    <div style={{ color: '#555', lineHeight: '1.8', maxWidth: '700px' }}>
      <p style={{ marginBottom: '2em' }}>Open-source projects and frameworks</p>

      <div style={{ display: 'grid', gap: '2em' }}>
        {[
          { title: 'Panther', desc: 'Privacy-focused Android browser with enhanced security controls.' },
          { title: 'SOSCW', desc: 'Linux userland distribution for cybersecurity professionals.' },
          { title: 'Dark Messenger', desc: 'Decentralized anonymous messaging with end-to-end encryption.' },
          { title: 'Vulnera', desc: 'Framework for running vulnerable server environments for testing.' }
        ].map((proj, idx) => (
          <div key={idx} style={{ paddingBottom: '1.5em', borderBottom: idx < 3 ? '1px solid #e5e5e5' : 'none' }}>
            <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>{proj.title}</h3>
            <p style={{ color: '#666' }}>{proj.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </article>
);
