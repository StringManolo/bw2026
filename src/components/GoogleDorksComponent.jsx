import { useState } from 'react';

export const GoogleDorksComponent = ({ theme }) => {
  const [target, setTarget] = useState('');
  const [dorks, setDorks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dorkTemplates = [
  {
    title: 'Backup Files',
    desc: 'Search for backup files that might contain sensitive data',
    query: 'site:{TARGET} ext:bkf OR ext:bkp OR ext:bak OR ext:old OR ext:backup'
  },
  {
    title: 'Config Files',
    desc: 'Find configuration files that may expose credentials or system details',
    query: 'site:{TARGET} ext:xml OR ext:conf OR ext:cnf OR ext:reg OR ext:inf OR ext:rdp OR ext:cfg OR ext:txt OR ext:ora OR ext:ini OR ext:env'
  },
  {
    title: 'Directory Listing',
    desc: 'Discover exposed directory listings showing internal file structure',
    query: 'site:{TARGET} intitle:index.of'
  },
  {
    title: 'Exposed Databases',
    desc: 'Look for publicly accessible database files',
    query: 'site:{TARGET} ext:sql OR ext:dbf OR ext:mdb'
  },
  {
    title: 'Log Files',
    desc: 'Find log files that might reveal system behavior or errors',
    query: 'site:{TARGET} ext:log'
  },
  {
    title: 'Login Pages',
    desc: 'Locate authentication and login endpoints',
    query: 'site:{TARGET} inurl:login OR inurl:signin OR inurl:auth OR inurl:admin'
  },
  {
    title: 'Public Documents',
    desc: 'Search for exposed documents',
    query: 'site:{TARGET} ext:doc OR ext:docx OR ext:pdf OR ext:xls OR ext:xlsx OR ext:ppt OR ext:pptx OR ext:csv'
  },
  {
    title: 'PHP Errors',
    desc: 'Find pages displaying PHP error messages that expose code details',
    query: 'site:{TARGET} "PHP Parse error" OR "PHP Warning" OR "PHP Error"'
  },
  {
    title: 'PHP Info Pages',
    desc: 'Discover phpinfo() pages revealing server configuration',
    query: 'site:{TARGET} ext:php intitle:phpinfo "published by the PHP Group"'
  },
  {
    title: 'SQL Errors',
    desc: 'Locate SQL error messages indicating potential injection points',
    query: 'site:{TARGET} intext:"sql syntax near" OR intext:"syntax error has occurred" OR intext:"incorrect syntax near" OR intext:"Warning: mysql_connect()" OR intext:"Warning: mysql_query()" OR intext:"Warning: pg_connect()"'
  },
  {
    title: 'GitHub/GitLab',
    desc: 'Find code repositories and leaked source code',
    query: '"{TARGET}" site:github.com OR site:gitlab.com'
  },
  {
    title: 'Pastebin Sites',
    desc: 'Search paste sites for leaked credentials or sensitive data',
    query: '{TARGET} site:pastebin.com OR site:paste2.org OR site:pastehtml.com OR site:slexy.org OR site:dpaste.org OR site:hastebin.com OR site:justpaste.it'
  },
  {
    title: 'StackOverflow',
    desc: 'Find developer discussions that might reveal technical details',
    query: '{TARGET} site:stackoverflow.com'
  },
  {
    title: 'Email Addresses',
    desc: 'Discover email addresses associated with the domain',
    query: 'site:{TARGET} intext:"@{TARGET}" OR intext:"email"'
  },
  {
    title: 'Admin Panels',
    desc: 'Common administration panels (CMS, servers, etc.)',
    query: 'site:{TARGET} intitle:"admin" OR intitle:"dashboard" OR intitle:"panel" OR intitle:"webmin" OR intitle:"cpanel" OR intitle:"plesk"'
  },
  {
    title: 'Exposed Ports and Services',
    desc: 'Find exposed services (SSH, FTP, RDP, etc.)',
    query: 'site:{TARGET} intitle:"index of" "ssh" OR "ftp" OR "rdp" OR "vnc" OR "telnet"'
  },
  {
    title: 'Exposed Jenkins',
    desc: 'Publicly accessible Jenkins instances',
    query: 'site:{TARGET} intitle:"Dashboard [Jenkins]" OR inurl:"/jenkins/" OR inurl:":8080/jenkins"'
  },
  {
    title: 'Docker and Kubernetes',
    desc: 'Exposed Docker/Kubernetes dashboards',
    query: 'site:{TARGET} intitle:"Kubernetes Dashboard" OR inurl:"/dashboard/" OR "Docker Desktop" OR "Portainer"'
  },
  {
    title: 'Password Files',
    desc: 'Look for files containing passwords',
    query: 'site:{TARGET} ext:txt "password" OR "passwd" OR "pwd" OR "creds" OR "credentials"'
  },
  {
    title: 'Private SSH Keys',
    desc: 'Exposed private SSH key files',
    query: 'site:{TARGET} "-----BEGIN RSA PRIVATE KEY-----" OR "-----BEGIN DSA PRIVATE KEY-----" OR "-----BEGIN EC PRIVATE KEY-----"'
  },
  {
    title: 'AWS and Cloud Keys',
    desc: 'Exposed cloud service credentials',
    query: 'site:{TARGET} "AKIA[0-9A-Z]{16}" OR "aws_access_key_id" OR "aws_secret_access_key" OR "s3.amazonaws.com"'
  },
  {
    title: 'Environment Variables',
    desc: '.env files containing sensitive configurations',
    query: 'site:{TARGET} ext:env "DB_PASSWORD" OR "API_KEY" OR "SECRET_KEY" OR "TOKEN"'
  },
  {
    title: 'API Documentation',
    desc: 'Exposed API documentation (Swagger, OpenAPI)',
    query: 'site:{TARGET} intitle:"Swagger UI" OR "swagger.json" OR "api-docs" OR "openapi.json"'
  },
  {
    title: 'GraphQL Endpoints',
    desc: 'Exposed GraphQL interfaces',
    query: 'site:{TARGET} inurl:"/graphql" OR inurl:"/graphiql" OR inurl:"/playground" "graphql"'
  },
  {
    title: 'WebSockets',
    desc: 'Exposed WebSocket endpoints',
    query: 'site:{TARGET} inurl:"ws://" OR inurl:"wss://" OR "socket.io"'
  },
  {
    title: 'LFI/RFI',
    desc: 'Possible file inclusion vulnerabilities',
    query: 'site:{TARGET} inurl:"page=" OR inurl:"file=" OR inurl:"cat=" OR inurl:"path=" OR inurl:"include="'
  },
  {
    title: 'XSS',
    desc: 'Parameters that could be vulnerable to XSS',
    query: 'site:{TARGET} inurl:"q=" OR inurl:"search=" OR inurl:"id=" OR inurl:"redirect=" OR inurl:"return="'
  },
  {
    title: 'Open Redirects',
    desc: 'Possible open redirect vulnerabilities',
    query: 'site:{TARGET} inurl:"redirect" OR inurl:"url" OR inurl:"next" OR inurl:"return" OR inurl:"rurl"'
  },
  {
    title: 'SQL Injection',
    desc: 'Database parameters in URLs',
    query: 'site:{TARGET} inurl:"id=" OR inurl:"pid=" OR inurl:"category=" OR inurl:"item=" OR inurl:"user="'
  },
  {
    title: 'WordPress',
    desc: 'WordPress files and configurations',
    query: 'site:{TARGET} inurl:"wp-content" OR inurl:"wp-includes" OR "wp-config.php" OR "xmlrpc.php"'
  },
  {
    title: 'Exposed Git',
    desc: 'Exposed .git repositories',
    query: 'site:{TARGET} inurl:"/.git/" OR intitle:"Index of /.git"'
  },
  {
    title: 'Subdomains',
    desc: 'Find subdomains of the target',
    query: 'site:*.{TARGET} -www'
  },
  {
    title: 'Cloud Storage',
    desc: 'Exposed cloud storage buckets',
    query: 'site:{TARGET} "s3.amazonaws.com" OR "storage.googleapis.com" OR "blob.core.windows.net"'
  },
  {
    title: 'Debug Mode',
    desc: 'Applications in debug/test mode',
    query: 'site:{TARGET} "DEBUG" OR "debug=true" OR "test" OR "staging" OR "development"'
  },
  {
    title: 'Developer Console',
    desc: 'Exposed development consoles',
    query: 'site:{TARGET} inurl:"/console" OR inurl:"/debug" OR inurl:"/_debug"'
  },
  {
    title: 'Metrics and Monitoring',
    desc: 'Exposed metrics and monitoring dashboards',
    query: 'site:{TARGET} inurl:"/metrics" OR inurl:"/status" OR inurl:"/health" OR "prometheus" OR "grafana"'
  },
  {
    title: 'Wayback Machine',
    desc: 'Historical site content',
    query: 'site:web.archive.org/*/{TARGET}/*'
  },
  {
    title: 'Compressed Backup Files',
    desc: 'Compressed files that may contain backups',
    query: 'site:{TARGET} ext:zip OR ext:tar OR ext:gz OR ext:tgz OR ext:rar OR ext:7z "backup" OR "dump" OR "bak"'
  },
  {
    title: 'JWT Tokens in JS',
    desc: 'JWT tokens exposed in JavaScript code',
    query: 'site:{TARGET} ext:js "jwt" OR "token" OR "Bearer" OR "localStorage" OR "sessionStorage"'
  }
];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const generateDorks = () => {
    if (!target.trim()) {
      showToastMessage('Please enter a target domain');
      return;
    }

    const generated = dorkTemplates.map(template => ({
      ...template,
      url: 'https://www.google.com/search?q=' + encodeURIComponent(
        template.query.replace(/{TARGET}/g, target.trim())
      )
    }));

    setDorks(generated);
    showToastMessage(`✓ Generated ${generated.length} dorks for ${target.trim()}`);
  };

  const openAllDorks = () => {
    if (dorks.length === 0) return;

    dorks.forEach((dork, index) => {
      setTimeout(() => {
        window.open(dork.url, '_blank', 'noopener,noreferrer');
      }, index * 100);
    });

    showToastMessage(`Opening ${dorks.length} dorks...`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateDorks();
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'inherit'
    }}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          padding: '1em 1.5em',
          background: theme.text,
          color: theme.bg,
          borderRadius: '4px',
          fontSize: '0.95em',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'slideIn 0.3s ease-out',
          zIndex: 1000
        }}>
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Input Section - copied from AISearchBar */}
      <div style={{
        marginBottom: '3em',
        padding: '2em',
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        background: theme.bg
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5em',
          marginBottom: '0',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="example.com"
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '0.75em 1em',
              fontSize: '1em',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              background: theme.bg,
              color: theme.text,
              fontFamily: 'monospace',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = theme.text}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />
          <button
            onClick={generateDorks}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: target.trim() ? 'pointer' : 'not-allowed',
              opacity: target.trim() ? 1 : 0.5,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Generate
          </button>
          <button
            onClick={openAllDorks}
            disabled={dorks.length === 0}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: dorks.length === 0 ? 'not-allowed' : 'pointer',
              opacity: dorks.length === 0 ? 0.5 : 1,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Open All
          </button>
        </div>
      </div>

      {/* Target Info */}
      {dorks.length > 0 && (
        <div style={{
          background: theme.isDark ? '#001a1a' : '#e8f4f8',
          border: `1px solid ${theme.isDark ? '#003333' : '#b8dce8'}`,
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '0.95em',
          color: theme.isDark ? '#66cccc' : '#2c5f7a'
        }}>
          Target: <strong>{target}</strong> | {dorks.length} dorks generated
        </div>
      )}

      {/* Dorks List */}
      <div>
        {dorks.map((dork, index) => (
          <div
            key={index}
            style={{
              background: theme.bg,
              border: `1px solid ${theme.border}`,
              borderRadius: '3px',
              padding: '20px',
              marginBottom: '15px',
              transition: 'border-color 0.2s'
            }}
          >
            <div style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '8px'
            }}>
              {dork.title}
            </div>
            <div style={{
              color: theme.textSecondary,
              fontSize: '0.9em',
              marginBottom: '12px',
              lineHeight: '1.6'
            }}>
              {dork.desc}
            </div>
            <a
              href={dork.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                color: theme.text,
                textDecoration: 'none',
                padding: '8px 16px',
                border: `1px solid ${theme.text}`,
                borderBottom: `1px solid ${theme.text}`,
                borderRadius: '3px',
                fontSize: '0.9em',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = theme.text;
                e.target.style.color = theme.bg;
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = theme.text;
              }}
            >
              Search →
            </a>
          </div>
        ))}
      </div>

      {/* Usage info */}
      {dorks.length === 0 && (
        <div style={{
          color: theme.textSecondary,
          fontSize: '0.95em',
          lineHeight: '1.8',
          marginTop: '30px'
        }}>
          <h3 style={{ marginBottom: '15px', color: theme.text }}>Usage</h3>
          <ol style={{ paddingLeft: '2em' }}>
            <li>Enter your target domain in the input field</li>
            <li>Click "Generate" to create all dork queries</li>
            <li>Click "Open All" to launch all searches at once</li>
            <li>Or click individual "Search" links to open specific dorks</li>
          </ol>
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: theme.isDark ? '#332200' : '#fff3cd',
            border: `1px solid ${theme.isDark ? '#664400' : '#ffc107'}`,
            borderRadius: '3px',
            color: theme.isDark ? '#ffcc66' : '#856404'
          }}>
            <strong>Disclaimer:</strong> This tool is for educational and authorized security testing only.
            Always obtain proper authorization before performing reconnaissance on any target.
          </div>
        </div>
      )}
    </div>
  );
};
