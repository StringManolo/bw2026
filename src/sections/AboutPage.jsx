export const AboutPage = () => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>About</h1>
    
    <div style={{ maxWidth: '700px', color: '#555', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1.5em' }}>
        Cybersecurity researcher and full-stack developer with deep expertise in vulnerability research, security tools development, and cryptography. Currently focused on privacy-focused solutions and innovative open-source contributions.
      </p>

      <p style={{ marginBottom: '1.5em' }}>
        Based in Galicia, Spain. Active member of the elhacker.net security community since 2012. Passionate about understanding systems at a fundamental level and building tools that protect privacy and security.
      </p>

      <p style={{ marginBottom: '2em' }}>
        Specializing in Android and Linux platforms, with expertise across full-stack development, offensive security tools, and command-line automation. Committed to publishing research and contributing to projects that advance cybersecurity practices.
      </p>

      <div style={{ 
        paddingTop: '2em',
        borderTop: '1px solid #e5e5e5',
        marginTop: '2em'
      }}>
        <p style={{ marginBottom: '1em', fontWeight: 700 }}>Connect</p>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2em' }}>
          <li><a href="https://github.com/stringmanolo" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://twitter.com/xsstringmanolo" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="mailto:manuelvarelacaldas@gmail.com">Email</a></li>
        </ul>
      </div>
    </div>
  </article>
);
