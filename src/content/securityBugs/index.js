// Solo metadata - el contenido está en archivos .md separados
export const securityBugsIndex = [
  {
  id: 'legacy-sqli-integration',
  title: 'SQL Injection in Legacy Integration Module',
  date: 'December 6, 2025',
  severity: 'High',
  vendor: '[Under Coordinated Disclosure]',
  description: 'SQL Injection vulnerability in legacy integration module. Critical identifiers censored - vulnerability under active remediation.',
  file: 'legacy-sqli-integration.md', 
  disclosure: [
    'December 6, 2025: Vulnerability discovered during code review',
    'December 2025: Reported via private channel',
    'December 2025: Vendor acknowledged and began remediation',
    'Status: Coordinated disclosure - patch in progress'
  ]
},

  {
  id: 'homedock-rate-limit-bypass',
  title: 'HomeDockOS Rate Limiting Bypass & Log Poisoning',
  date: 'October 2, 2025', 
  severity: 'Low',
  vendor: 'BansheeTech',
  description: 'Rate limiting bypass via X-Forwarded-For header manipulation enabling unlimited brute force attempts, combined with log poisoning through username newline injection.',
  file: 'homedock-rate-limit-bypass.md',
  disclosure: [
    '2025: Vulnerabilities discovered during code review',
    '2025: Reported to BansheeTech via Telegram',
    '2025: Vendor acknowledged issues',
    'v2.0.1.88 (2025): Fixed'
  ]
},
  {
  id: 'elhacker-dos-hanging-connection',
  title: 'ElHacker.net Denial of Service via Hanging HTTP Connection',
  date: 'October 5, 2020',
  severity: 'Medium',  // DoS que afecta funcionalidad pero no datos
  vendor: 'ElHacker.net',
  description: 'Denial of Service attack through BBCode image tags with hanging HTTP connections, blocking forum functionality for all users viewing affected threads.',
  file: 'elhacker-dos-hanging-connection.md',
  disclosure: [
    'October 5, 2020: Vulnerability discovered during private testing',
    'October 5, 2020: Controlled demonstration in test section',
    'October 5, 2020: Independent verification by user "drvy"',
    'October 5, 2020: Comprehensive report sent to webmaster@elhacker.net'
  ]
},
  {
    id: 'w3schools-xss-1',
    title: 'W3Schools Stored XSS Vulnerability',
    date: 'October 1, 2020',
    severity: 'Medium',
    vendor: 'W3Schools',
    description: 'Stored Cross-Site Scripting vulnerability in profile name field at mypage.w3schools.com.',
    file: 'w3schools-xss-1.md',
    disclosure: [
      'October 1, 2020 01:20 (Spain): Vulnerability discovered',
      'October 1, 2020: Reported to W3Schools'
    ]
  },
  {
    id: 'w3schools-csrf-1',
    title: 'W3Schools Logout CSRF',
    date: 'October 1, 2020',
    severity: 'Low',
    vendor: 'W3Schools',
    description: 'CSRF vulnerability in logout endpoint allowing forced logout from any external webpage.',
    file: 'w3schools-csrf-1.md',
    disclosure: [
      'October 1, 2020 01:54 (Spain): Vulnerability discovered',
      'October 1, 2020: Reported to W3Schools'
    ]
  },
  {
  id: 'elhacker-session-cookie-leak',
  title: 'ElHacker.net Session Leakage & CSRF Logout Chain',
  date: 'July 23-24, 2020',
  severity: 'Critical',  // Account takeover + CSRF amplificado desde el propio foro
  vendor: 'ElHacker.net',
  description: 'Session cookie leakage via HTTP Referer enabling account takeover, chained with CSRF logout amplified by forum rendered images.',
  file: 'elhacker-session-cookie-leak.md',
  disclosure: [
    'July 23, 2020 20:24: Vulnerability chain discovered',
    'July 24, 2020: Comprehensive report sent to webmaster@elhacker.net',
    'July 24, 2020: Partial fix implemented (Referrer-Policy: origin)',
    'July 24, 2020: Additional recommendations provided'
  ]
},
  {
  id: 'elhacker-xss-waf-bypass',
  title: 'ElHacker.net Reflected XSS with WAF Bypass',
  date: 'June 13-14, 2020',
  severity: 'Medium',  // Reflected XSS con bypass de WAF
  vendor: 'ElHacker.net',
  description: 'Reflected XSS vulnerability bypassing ModSecurity WAF through HTML attribute injection and CSS-based data exfiltration.',
  file: 'elhacker-xss-waf-bypass.md',
  disclosure: [
    'June 13, 2020 21:56-23:14: Vulnerability discovered and tested',
    'June 13, 2020: Reported to webmaster@elhacker.net',
    'June 14, 2020: Response received with ModSecurity logs',
    'June 14, 2020: Bypass proof provided'
  ]
},
  {
  id: '3x1',
  title: 'Triple Vulnerability Chain: XSS + Predictable Credentials + CSRF',
  date: 'November 27, 2019',
  severity: 'Critical',  // 3 bugs encadenados = account takeover completo
  vendor: '[Undisclosed]',
  description: 'Chain of three vulnerabilities: Reflected XSS, predictable admin credentials, and CSRF login/logout allowing full account takeover.',
  file: '3x1.md',
  disclosure: [
    'November 27-28, 2019: Vulnerabilities discovered',
    'November 2019: Reported to website owner'
  ]
}
];

// Pre-cargar todos los archivos .md usando import.meta.glob (forma oficial de Vite)
const markdownFiles = import.meta.glob('./*.md', { 
  query: '?raw',
  import: 'default'
});

// Helper para cargar el contenido de un bug dinámicamente
export const loadBugContent = async (bugId) => {
  const bug = securityBugsIndex.find(b => b.id === bugId);
  if (!bug) return null;

  try {
    // Buscar el loader del archivo
    const loader = markdownFiles[`./${bug.file}`];
    
    if (!loader) {
      console.error(`Markdown file not found: ${bug.file}`);
      return null;
    }

    // Cargar el contenido
    const content = await loader();
    
    return {
      ...bug,
      content: content
    };
  } catch (error) {
    console.error(`Error loading bug content for ${bugId}:`, error);
    return null;
  }
};
