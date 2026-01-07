// Solo metadata - el contenido está en archivos .md separados
export const articlesIndex = [
  {
    id: 'xss-series-chapter-1',
    title: 'Security Series - Chapter 1: XSS',  // ← Cambiado
    date: '2020',
    category: 'Security',
    language: 'English',  // ← Cambiado de 'Español'
    excerpt: 'Complete series on Cross Site Scripting: types, basic, intermediate and advanced techniques. Includes polyglots, DOM Clobbering, Dangling Markup and more.',  // ← Traducido
    file: 'xss-series-chapter-1.md',
    tags: ['XSS', 'JavaScript', 'Web Security', 'Tutorial']
  },
];

// Pre-cargar todos los archivos .md usando import.meta.glob (forma oficial de Vite)
const markdownFiles = import.meta.glob('./*.md', { 
  query: '?raw',
  import: 'default'
});

// Helper para cargar el contenido de un artículo dinámicamente
export const loadArticleContent = async (articleId) => {
  const article = articlesIndex.find(a => a.id === articleId);
  if (!article) return null;

  try {
    // Buscar el loader del archivo
    const loader = markdownFiles[`./${article.file}`];
    
    if (!loader) {
      console.error(`Markdown file not found: ${article.file}`);
      return null;
    }

    // Cargar el contenido
    const content = await loader();
    
    return {
      ...article,
      content: content
    };
  } catch (error) {
    console.error(`Error loading article content for ${articleId}:`, error);
    return null;
  }
};
