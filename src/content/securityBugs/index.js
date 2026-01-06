// Solo metadata - el contenido está en archivos .md separados
export const securityBugsIndex = [
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
