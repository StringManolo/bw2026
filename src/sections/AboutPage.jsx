export const AboutPage = ({ theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>About</h1>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3em',
      alignItems: 'start',
      marginBottom: '2em'
    }}>
      {/* Profile Image Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5em'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '350px',
          aspectRatio: '1',
          overflow: 'hidden',
          borderRadius: '12px',
          border: `3px solid ${theme.border}`,
          boxShadow: theme.isDark 
            ? '0 4px 12px rgba(0,0,0,0.5)' 
            : '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="/resources/about_stringmanolo.webp" 
            alt="StringManolo - Cybersecurity Researcher"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{
          textAlign: 'center',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '1.5em',
            fontWeight: 700,
            marginBottom: '0.3em',
            color: theme.text
          }}>
            Manuel Varela
          </h2>
          <p style={{
            color: theme.textSecondary,
            fontSize: '1em',
            fontWeight: 500
          }}>
            Cybersecurity Researcher & Developer
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div style={{
        color: theme.textSecondary,
        lineHeight: '1.8',
        fontSize: '1.05em'
      }}>
        <p style={{ marginBottom: '1.5em' }}>
          Cybersecurity researcher and full-stack developer with deep expertise in vulnerability research, security tools development, and cryptography. Currently focused on privacy-focused solutions and innovative open-source contributions.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          Based in Galicia, Spain. Active member of the elhacker.net security community since 2012. Passionate about understanding systems at a fundamental level and building tools that protect privacy and security.
        </p>
        <p style={{ marginBottom: '1.5em' }}>
          Specializing in Android and Linux platforms, with expertise across full-stack development, offensive security tools, and command-line automation. Committed to publishing research and contributing to projects that advance cybersecurity practices.
        </p>

        {/* Skills/Expertise Section */}
        <div style={{
          backgroundColor: theme.card,
          padding: '1.5em',
          borderRadius: '8px',
          marginTop: '2em',
          marginBottom: '2em',
          border: `1px solid ${theme.border}`
        }}>
          <h3 style={{
            fontSize: '1.1em',
            fontWeight: 700,
            marginBottom: '1em',
            color: theme.text
          }}>
            Core Expertise
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1em'
          }}>
            <div>
              <strong style={{ color: theme.text }}>Security Research</strong>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0.5em 0 0 0',
                color: theme.textSecondary,
                fontSize: '0.95em'
              }}>
                <li>• Vulnerability Discovery</li>
                <li>• XSS & Injection Attacks</li>
                <li>• Web Application Security</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: theme.text }}>Development</strong>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0.5em 0 0 0',
                color: theme.textSecondary,
                fontSize: '0.95em'
              }}>
                <li>• Android Development (Kotlin)</li>
                <li>• Full-Stack JavaScript</li>
                <li>• Python Security Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Connect Section */}
    <div style={{
      paddingTop: '2em',
      borderTop: `2px solid ${theme.border}`,
      marginTop: '2em'
    }}>
      <h3 style={{
        marginBottom: '1em',
        fontWeight: 700,
        fontSize: '1.2em',
        color: theme.text
      }}>
        Connect
      </h3>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2em',
        padding: 0
      }}>
        <li>
          <a 
            href="https://github.com/stringmanolo" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              color: theme.link,
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <span>→</span> GitHub
          </a>
        </li>
        <li>
          <a 
            href="https://twitter.com/xsstringmanolo" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              color: theme.link,
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <span>→</span> Twitter
          </a>
        </li>
        <li>
          <a 
            href="mailto:manuelvarelacaldas@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              color: theme.link,
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <span>→</span> Email
          </a>
        </li>
      </ul>
    </div>
  </article>
);
