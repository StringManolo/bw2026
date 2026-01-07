export const miscIndex = [
  {
    id: 'bug-list',
    title: 'BL - Comprehensive Web Vulnerability Classification',
    date: 'January 2026',
    category: 'Security Reference',
    description: 'Complete taxonomy of web application vulnerabilities including authentication flaws, injection attacks, cryptographic weaknesses, and LLM-specific threats. Interactive reference with detailed descriptions.',
    file: 'bug-list.md',
    tags: ['security', 'vulnerabilities', 'reference', 'pentesting', 'bug-bounty']
  },
  {
    id: 'debian-config',
    title: 'debianConfig - Automated Debian Development Environment',
    date: 'January 2026',
    category: 'System Configuration',
    description: 'Automated configuration script that transforms a fresh Debian installation into a fully-equipped development environment with vim plugins, shell enhancements, and development tools.',
    file: 'debian-config.md',
    tags: ['debian', 'automation', 'vim', 'development', 'termux']
  },
  {
    id: 'smbse-bash-shell-extension',
    title: 'SMBSE - Bash Shell Extension',
    date: 'January 2026',
    category: 'Shell Environment',
    description: 'Enhanced .bashrc with unique tools, organized filesystem structure, and built-in code execution for JavaScript and C++. Designed for Termux and Linux environments.',
    file: 'smbse-bash-shell-extension.md',
    tags: ['bash', 'shell', 'productivity', 'termux', 'linux']
  }
];

// Pre-load all .md files using import.meta.glob (Vite's official way)
const markdownFiles = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default'
});

// Helper to load misc content dynamically
export const loadMiscContent = async (miscId) => {
  const item = miscIndex.find(m => m.id === miscId);
  if (!item) return null;

  try {
    // Find the file loader
    const loader = markdownFiles[`./${item.file}`];

    if (!loader) {
      console.error(`Markdown file not found: ${item.file}`);
      return null;
    }

    // Load the content
    const content = await loader();

    return {
      ...item,
      content: content
    };
  } catch (error) {
    console.error(`Error loading misc content for ${miscId}:`, error);
    return null;
  }
};
