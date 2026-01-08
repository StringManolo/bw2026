export const HomePage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ 
      fontSize: 'clamp(2.5em, 4vw, 3.5em)',
      marginBottom: '0.5em',
      fontWeight: 700,
      lineHeight: 1.2
    }}>Security Research & Development</h1>
    
    <p style={{ 
      fontSize: 'clamp(1.1em, 1.3vw, 1.3em)',
      color: theme.textSecondary,
      maxWidth: '700px',
      lineHeight: 1.8,
      marginBottom: '3em'
    }}>
      Cybersecurity researcher and full-stack developer specializing in vulnerability research, security tools, and open-source contributions. Based in Galicia, Spain.
    </p>

    <section style={{ marginBottom: '4em' }}>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>Explore by Category</h2>
      <div className="section-grid">
        {[
          { title: 'Security Bugs', desc: 'Real vulnerability reports and CVE disclosures', route: 'security-bugs' },
          { title: 'Research', desc: 'In-depth security analysis and findings', route: 'research' },
          { title: 'Articles', desc: 'Technical articles and analysis', route: 'articles' },
          { title: 'Tools', desc: 'Open-source security utilities and frameworks', route: 'tools' },
          { title: 'Tutorials', desc: 'Educational content on security topics', route: 'tutorials' },
          { title: 'Papers', desc: 'Academic and technical publications', route: 'papers' },
          { title: 'Miscellaneous', desc: 'Resources and notes on various topics', route: 'misc' },
          { title: 'Development', desc: 'Project development and coding practices', route: 'development' }
        ].map((cat, idx) => (
          <div 
            key={idx} 
            className="section-card"
            onClick={() => updateRoute(cat.route)}
          >
            <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>{cat.title}</h3>
            <p style={{ color: theme.textSecondary, fontSize: '0.95em' }}>{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section style={{ paddingBottom: '3em', borderBottom: '1px solid #e5e5e5' }}>
      <h2 style={{ fontSize: '1.3em', marginBottom: '1.5em', fontWeight: 700 }}>Core Expertise</h2>
      <div style={{ display: 'grid', gap: '2em' }}>
        <div>
          <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>Security</h3>
          <p style={{ color: theme.textSecondary }}>Vulnerability research, cryptography, privacy-focused solutions, and threat analysis.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>Development</h3>
          <p style={{ color: theme.textSecondary }}>Full-stack web development, Android applications, Linux tools, and CLI utilities.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1em', marginBottom: '0.5em', fontWeight: 700 }}>Open Source</h3>
          <p style={{ color: theme.textSecondary }}>Active contributor to security projects, developer tools, and community initiatives.</p>
        </div>
      </div>
    </section>
  </article>
);
