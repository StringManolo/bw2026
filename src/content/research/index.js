// Solo metadata - el contenido está en archivos .md separados
export const researchIndex = [
  {
    id: 'bcrypt-truncation-vulnerability',
    title: 'Bcrypt Truncation Vulnerability: Analysis and Mitigations',
    date: 'November 4, 2025',
    updated: 'January 2026',
    category: 'Authentication Security',
    excerpt: 'In-depth analysis of bcrypt\'s 72-byte limitation and its security implications. Includes practical demonstrations, attack vectors, and comprehensive mitigation strategies.',
    file: 'bcrypt-truncation-vulnerability.md',
    tags: ['Bcrypt', 'Authentication', 'Cryptography', 'Vulnerability Analysis', 'Password Security']
  },
  {
    id: 'smart-tv-acr-security-risks',
    title: 'When Your Smart TV Becomes a Monitor: ACR Risks in Sensitive Environments',
    date: 'November 2025',
    updated: 'January 2026',
    category: 'Privacy & Surveillance',
    excerpt: 'Technical analysis of Automatic Content Recognition (ACR) in Smart TVs when used as PC monitors. Explores threat models, attack chains, and practical mitigations for sensitive environments.',
    file: 'smart-tv-acr-security-risks.md',
    tags: ['Smart TV', 'ACR', 'Privacy', 'IoT Security', 'Surveillance']
  }
];

// Pre-cargar todos los archivos .md usando import.meta.glob (forma oficial de Vite)
const markdownFiles = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default'
});

// Helper para cargar el contenido de un research paper dinámicamente
export const loadResearchContent = async (researchId) => {
  const research = researchIndex.find(r => r.id === researchId);
  if (!research) return null;

  try {
    // Buscar el loader del archivo
    const loader = markdownFiles[`./${research.file}`];

    if (!loader) {
      console.error(`Markdown file not found: ${research.file}`);
      return null;
    }

    // Cargar el contenido
    const content = await loader();

    return {
      ...research,
      content: content
    };
  } catch (error) {
    console.error(`Error loading research content for ${researchId}:`, error);
    return null;
  }
};
